import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DASHBOARD } from './vite.config.mjs'

const here = (path) => fileURLToPath(new URL(path, import.meta.url))
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const OUT = process.env.OUT ?? here('../../public/landing/previews')
const VITE = 'http://127.0.0.1:5191/dashboard/'
const CDP = 9334
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const vite = spawn(process.execPath, [`${DASHBOARD}/node_modules/vite/bin/vite.js`, '--config', here('./vite.config.mjs'), '--host', '127.0.0.1'], { stdio: 'ignore' })
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${CDP}`, `--user-data-dir=${join(tmpdir(), 'gb-previews')}`, 'about:blank'], { stdio: 'ignore' })

async function poll(fn) {
  for (let i = 0; i < 120; i++) {
    try {
      const value = await fn()
      if (value) return value
    } catch {}
    await sleep(250)
  }
  throw new Error('timeout')
}

try {
  await poll(() => fetch(VITE).then((r) => r.ok))
  const target = await poll(async () => (await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json()).find((t) => t.type === 'page'))
  const ws = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((r) => ws.addEventListener('open', r, { once: true }))
  let id = 0
  const pending = new Map()
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data)
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m.result)
      pending.delete(m.id)
    }
  })
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
  const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value

  // PAGE=docs.html dựng ảnh minh họa của docs vào thư mục assets của docs, mỗi shot một file theo id
  if (process.env.PAGE) {
    const out = process.env.OUT ?? here('../../web/content/docs/docs/assets')
    await send('Emulation.setDeviceMetricsOverride', { width: 2200, height: 900, deviceScaleFactor: 2, mobile: false })
    await send('Page.navigate', { url: `${VITE}${process.env.PAGE}` })
    await poll(() => evaluate('window.__ready === true'))
    const shots = await evaluate(`[...document.querySelectorAll('[data-shot]')].map((el) => { const r = el.getBoundingClientRect(); return { id: el.dataset.shot, x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height } })`)
    for (const shot of shots.filter((s) => !process.env.ONLY || process.env.ONLY.split(',').includes(s.id))) {
      const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: shot.x, y: shot.y, width: shot.width, height: shot.height, scale: 1 } })
      mkdirSync(join(out, shot.id, '..'), { recursive: true })
      writeFileSync(join(out, `${shot.id}.png`), Buffer.from(data, 'base64'))
      console.log(`${shot.id}.png`)
    }
    ws.close()
    chrome.kill()
    vite.kill()
    process.exit(0)
  }
  await send('Emulation.setDeviceMetricsOverride', { width: 720, height: 900, deviceScaleFactor: 2, mobile: false })
  mkdirSync(OUT, { recursive: true })
  // bản tiếng Anh cho trang /en/: nối từ, quote và ảnh embed link giữ tiếng Việt nên không dựng lại
  const VI_ONLY = /^(wordconnect|quote|embed-.+)$/
  for (const [lang, theme, suffix] of [['vi', 'ash', 'dark'], ['vi', 'light', 'light'], ['en', 'ash', 'en-dark'], ['en', 'light', 'en-light']]) {
    await send('Page.navigate', { url: `${VITE}?theme=${theme}&lang=${lang}` })
    await poll(() => evaluate('window.__ready === true'))
    const shots = await evaluate(`[...document.querySelectorAll('[data-shot]')].map((el) => { const r = el.getBoundingClientRect(); return { id: el.dataset.shot, x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height } })`)
    for (const shot of shots.filter((s) => (!process.env.ONLY || process.env.ONLY.split(',').includes(s.id)) && !(lang === 'en' && VI_ONLY.test(s.id)))) {
      const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: shot.x, y: shot.y, width: shot.width, height: shot.height, scale: 1 } })
      writeFileSync(join(OUT, `${shot.id}-${suffix}.png`), Buffer.from(data, 'base64'))
      console.log(`${shot.id}-${suffix}.png`)
    }
  }
  ws.close()
} finally {
  chrome.kill()
  vite.kill()
}
