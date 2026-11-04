import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const repo = 'BucketDevelopment/GlitchBucket-Dashboard'
const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })

let frontend = process.env.DASHBOARD_DIR
let commit = ''
let temp = ''
if (!frontend) {
  const token = process.env.DASHBOARD_TOKEN
  if (!token) {
    console.warn('[dashboard] thiếu DASHBOARD_TOKEN, bỏ qua build dashboard')
    process.exit(0)
  }
  temp = mkdtempSync(join(tmpdir(), 'dashboard-'))
  const url = `https://x-access-token:${token}@github.com/${repo}.git`
  execFileSync('git', ['clone', '--depth', '1', '--branch', process.env.DASHBOARD_BRANCH || 'main', url, temp], { stdio: 'ignore' })
  commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: temp }).toString().trim()
  frontend = join(temp, 'frontend')
}

run('npm', ['ci', '--no-audit', '--no-fund'], frontend)
execFileSync('npm', ['run', 'build'], {
  cwd: frontend,
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: { ...process.env, DASHBOARD_COMMIT_SHA: commit || process.env.DASHBOARD_COMMIT_SHA || '' },
})

const output = join(frontend, 'dist')
if (!existsSync(join(output, 'index.html'))) throw new Error('[dashboard] build không ra index.html')
rmSync('dist/dashboard', { recursive: true, force: true })
cpSync(output, 'dist/dashboard', { recursive: true })
if (temp) rmSync(temp, { recursive: true, force: true })
console.log('[dashboard] đã chép vào dist/dashboard' + (commit ? ` (${commit.slice(0, 8)})` : ''))
