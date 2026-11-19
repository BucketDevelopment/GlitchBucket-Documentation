import { StrictMode, useEffect, useRef, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './preview.css'
import { EmbedPreview, LayoutPreview, Markdown, MentionProvider } from '@/components/discord-preview'
import type { DiscordEmbed, LayoutComponent } from '@/lib/contracts'
import { Twemoji } from '@/lib/twemoji'
import { BRAND } from '../../web/data/brand.mjs'
import banner from '../../public/landing/embed-banner.png'
import tudubucketAvatar from './tudubucket.webp'
import panels from './docs/components-panels.png'
import componentsBanner from './docs/components-banner.png'
import official from './docs/components-official.png'
import gura from './docs/gura.png'

// ảnh minh họa trong docs (giveaway, layout), dựng lại bằng preview Discord của dashboard để mang tên và avatar mới của bot
const brandFiles = import.meta.glob('../../public/brand/*', { eager: true, query: '?url', import: 'default' })
const botAvatar = brandFiles[`../../public${BRAND.botAvatar}`] as string
const SERVER = 'nemuri support'
const USERS = { '1': 'tudubucket' }
const at = (hour: number, minute: number) => {
  const date = new Date()
  date.setHours(hour, minute, 0, 0)
  return date
}
const unix = (date: Date) => Math.floor(date.getTime() / 1000)
const hhmm = (date: Date) => date.toTimeString().slice(0, 5)

type Button = { label?: string; emoji?: string; style?: number; disabled?: boolean; url?: string }
const buttons = (...list: Button[]): LayoutComponent =>
  ({
    type: 1,
    components: list.map((b, i) => ({
      type: 2,
      custom_id: `b${i}`,
      style: b.style ?? 2,
      label: b.label,
      url: b.url,
      disabled: b.disabled,
      emoji: b.emoji ? { id: null, name: b.emoji } : null,
    })),
  }) as LayoutComponent

const Badge = () => (
  <span className="relative top-[1.6px] mt-0.5 ml-1 inline-flex h-[15px] items-center rounded-[4px] bg-[#5865f2] px-[4.4px] align-top text-white">
    <svg viewBox="0 0 24 24" className="-mt-[0.32px] -ml-[3.2px] block size-4" aria-hidden>
      <path fill="currentColor" fillRule="evenodd" d="M19.06 6.94a1.5 1.5 0 0 1 0 2.12l-8 8a1.5 1.5 0 0 1-2.12 0l-4-4a1.5 1.5 0 0 1 2.12-2.12L10 13.88l6.94-6.94a1.5 1.5 0 0 1 2.12 0Z" />
    </svg>
    <span className="block text-[12.8px] leading-[15px] font-semibold">APP</span>
  </span>
)

const Spine = () => <span className="absolute top-2 -left-[37px] h-3 w-[33px] rounded-tl-[6px] border-t-2 border-l-2 border-[#474851]" />

function Row({ time, used, reply, highlight, h12, children }: { time: Date; used?: string; reply?: string; highlight?: boolean; h12?: boolean; children: ReactNode }) {
  return (
    <div className={`relative min-w-0 py-1 pr-4 pl-[72px] ${highlight ? 'bg-[#f0b132]/[.08] shadow-[inset_2px_0_0_#f0b132]' : ''}`}>
      {used && (
        <div className="relative mb-1 flex h-[18px] items-center text-sm leading-[18px] whitespace-pre text-[#efeff1]">
          <Spine />
          <img src={tudubucketAvatar} alt="" className="mr-1 size-4 shrink-0 rounded-full object-cover" />
          <span className="mr-1 shrink-0 font-medium text-[#f1c40f]">tudubucket</span>
          <span className="mr-1 shrink-0">used</span>
          <span className="shrink-0 rounded-[3px] bg-[#5865f2]/30 px-0.5 font-medium text-[#c9cdfb]">{used}</span>
        </div>
      )}
      {reply && (
        <div className="relative mb-1 flex h-[18px] items-center text-sm leading-[18px] whitespace-pre text-[#efeff1]">
          <Spine />
          <img src={botAvatar} alt="" className="mr-1 size-4 shrink-0 rounded-full object-cover" />
          <Badge />
          <span className="mr-1 ml-1 shrink-0 font-medium text-[#7ab8d6]">@{BRAND.name}</span>
          <span className="truncate font-semibold">{reply}</span>
        </div>
      )}
      <div className="relative">
        <img src={botAvatar} alt="" className="absolute top-0.5 -left-14 size-10 rounded-full object-cover" />
        <h3 className="h-[22px] text-base leading-[22px] whitespace-nowrap">
          <span className="mr-1">
            <span className="font-medium text-[#7ab8d6]">{BRAND.name}</span>
            <Badge />
          </span>
          <span className="ml-1 inline-block h-5 text-xs leading-[22px] font-medium text-[#81828a]">{h12 ? time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : hhmm(time)}</span>
        </h3>
        <div className="flex flex-col gap-1 text-base leading-[22px]">{children}</div>
      </div>
    </div>
  )
}

const Edited = ({ text }: { text: string }) => (
  <div className="flex flex-wrap items-baseline gap-1">
    <Markdown text={text} />
    <span className="text-[10px] leading-none text-[#81828a]">(edited)</span>
  </div>
)

function Option({ emoji, label, description }: { emoji: string; label: string; description: string }) {
  return (
    <div className="flex w-[480px] items-center gap-3 rounded-lg border border-[#94949c]/12 bg-[#28282d] px-3 py-3">
      <Twemoji emoji={emoji} className="size-6 shrink-0" />
      <div className="min-w-0 text-base leading-5">
        <strong className="block font-semibold text-[#fbfbfb]">{label}</strong>
        <span className="text-[#abacb2]">{description}</span>
      </div>
    </div>
  )
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" className="size-9 text-white" aria-hidden>
    <path fill="currentColor" d="M10.5 3h3v12.6l4.4-4.4 2.1 2.1-8 8-8-8 2.1-2.1 4.4 4.4V3Z" />
  </svg>
)

function Stage({ option, children }: { option: [string, string, string]; children: ReactNode }) {
  return (
    <div className="flex w-[640px] flex-col items-center gap-4 py-8">
      <Option emoji={option[0]} label={option[1]} description={option[2]} />
      <Arrow />
      <div className="w-full">{children}</div>
    </div>
  )
}

const Shot = ({ id, children, width }: { id: string; children: ReactNode; width?: number }) => (
  <section data-shot={id} className="w-fit bg-[#1a1a1e] font-discord text-[#efeff1]" style={{ width }}>
    {children}
  </section>
)

const OPTIONS = {
  running: ['🕐', 'Đang diễn ra', 'Tin nhắn giveaway khi giveaway đang diễn ra'],
  finished: ['🏁', 'Đã kết thúc, có winner', 'Tin nhắn giveaway khi giveaway kết thúc'],
  no_winner: ['📪', 'Đã kết thúc, không có winner', 'Tin nhắn giveaway khi không có người chiến thắng'],
  rolled: ['🎊', 'Công bố kết quả', 'Tin nhắn phản hồi công bố người chiến thắng'],
  rerolled: ['🔄', 'Reroll người thắng', 'Tin nhắn phản hồi khi reroll người chiến thắng'],
  no_winner_reply: ['💬', 'Không có winner', 'Tin nhắn phản hồi khi không có người chiến thắng'],
} satisfies Record<string, [string, string, string]>

const start = at(20, 41)
const giveawayEmbed = (title: string, ends: Date, last: string, edited: Date): DiscordEmbed => ({
  color: 0xc0cdff,
  author: { name: SERVER, icon_url: botAvatar },
  title,
  description: `- Tổ chức bởi: <@1>\n- Thời lượng: 1 phút và 9 giây (Kết thúc: <t:${unix(ends)}:R>)\n- ${last}`,
  footer: { text: `${BRAND.name} • 1 Người chiến thắng`, icon_url: botAvatar },
  timestamp: edited.toISOString(),
})

function Running() {
  const time = at(20, 42)
  return (
    <Row time={time}>
      <Markdown text="🎉🎉 **GIVEAWAY MỚI** 🎉🎉" />
      <EmbedPreview embed={giveawayEmbed('free chit', new Date(Date.now() + 60_000), 'Số người tham gia: **0**', time)} />
      <LayoutPreview components={[buttons({ label: 'Tham gia Giveaway!', emoji: '🎉', style: 3 }, { label: 'Người tham gia', emoji: '👦' })]} />
    </Row>
  )
}

function Finished() {
  const time = at(20, 54)
  return (
    <Row time={time}>
      <Edited text="🎉🎉 **GIVEAWAY ĐÃ KẾT THÚC** 🎉🎉" />
      <EmbedPreview embed={giveawayEmbed('dog', new Date(Date.now() - 1000), 'Người chiến thắng: <@1>', time)} />
      <LayoutPreview components={[buttons({ label: '1 Người tham gia', emoji: '🎉', style: 3, disabled: true }, { label: 'Người tham gia', emoji: '👦' })]} />
    </Row>
  )
}

function NoWinner() {
  const time = at(20, 42)
  return (
    <Row time={time}>
      <Edited text="🎉🎉 **GIVEAWAY ĐÃ KẾT THÚC** 🎉🎉" />
      <EmbedPreview embed={giveawayEmbed('free chit', new Date(Date.now() - 15 * 60_000), 'Người chiến thắng: Không thể xác định người chiến thắng ...', time)} />
      <LayoutPreview components={[buttons({ label: '0 Người tham gia', emoji: '🎉', style: 3, disabled: true }, { label: 'Người tham gia', emoji: '👦' })]} />
    </Row>
  )
}

const ENDED = '🎉🎉 GIVEAWAY ĐÃ KẾT THÚC 🎉🎉'

function Editor({ children }: { children?: ReactNode }) {
  return (
    <Row time={at(21, 49)} used="/giveaway messages">
      <EmbedPreview
        embed={{
          color: 0x2b2d31,
          title: 'Chỉnh sửa tin nhắn Giveaway',
          description: 'Bạn đang thực hiện chỉnh sửa phần **Đang diễn ra** của tin nhắn Giveaway.\n(Tin nhắn giveaway khi giveaway đang diễn ra)',
          footer: { text: BRAND.name, icon_url: botAvatar },
        }}
      />
      {children}
    </Row>
  )
}

function OpenSelect({ placeholder, options }: { placeholder: string; options: [string, string, string][] }) {
  return (
    <div className="w-[420px] max-w-full">
      <div className="flex min-h-10 items-center gap-2 rounded-lg border border-[#9696a0]/20 bg-black/12 py-2 pr-2 pl-3 font-medium">
        <span className="flex-1 truncate text-base leading-4 text-[#abacb2]">{placeholder}</span>
        <svg viewBox="0 0 24 24" className="size-[18px] rotate-180 text-[#efeff1]" fill="currentColor" aria-hidden>
          <path d="M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.29 5.3-5.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.42Z" />
        </svg>
      </div>
      <div className="mt-2 overflow-hidden rounded-lg border border-[#94949c]/12 bg-[#28282d]">
        {options.map(([emoji, label, description]) => (
          <div key={label} className="flex items-center p-2">
            <Twemoji emoji={emoji} className="mr-2 size-[22px] shrink-0" />
            <div className="min-w-0 text-sm leading-[18px]">
              <strong className="mb-1 block font-semibold text-[#fbfbfb]">{label}</strong>
              <span className="text-[#abacb2]">{description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ô và mũi tên chỉ phần tin nhắn (xanh) và phần embed (vàng) mà hai nút chỉnh sửa tác động
function Definition() {
  const root = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const draw = () => {
      const box = root.current!.getBoundingClientRect()
      const rect = (selector: string) => {
        const r = root.current!.querySelector(selector)!.getBoundingClientRect()
        return { x: r.x - box.x, y: r.y - box.y, w: r.width, h: r.height }
      }
      const buttons = [...root.current!.querySelectorAll('[data-editor] span.min-h-8')].slice(-2).map((el) => {
        const r = el.getBoundingClientRect()
        return { x: r.x - box.x, y: r.y - box.y, w: r.width, h: r.height }
      })
      const content = rect('[data-part="content"]')
      const embed = rect('[data-part="embed"]')
      const line = (x1: number, y1: number, x2: number, y2: number, color: string) => {
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3" stroke-linecap="round" marker-end="url(#head-${color.slice(1)})"/>`
      }
      const head = (color: string) =>
        `<marker id="head-${color.slice(1)}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="${color}"/></marker>`
      svg.current!.innerHTML = `<defs>${head('#5bc0eb')}${head('#fff08a')}</defs>${line(buttons[0].x + buttons[0].w * .5, buttons[0].y + buttons[0].h + 10, content.x + content.w + 6, content.y + content.h / 2, '#5bc0eb')}${line(buttons[1].x + buttons[1].w * .3, buttons[1].y + buttons[1].h + 12, embed.x + embed.w + 10, embed.y - 10, '#fff08a')}`
    }
    const timer = setTimeout(draw, 300)
    return () => clearTimeout(timer)
  }, [])
  const time = at(20, 42)
  return (
    <div ref={root} className="relative w-[915px] py-6">
      <div data-editor className="ml-[210px]">
        <Editor>
          <LayoutPreview
            components={[
              buttons({ label: 'Quay lại', emoji: '⬅️', style: 1 }),
              buttons({ label: 'Chỉnh sửa tin nhắn', emoji: '🔤' }, { label: 'Chỉnh sửa Embed', emoji: '🖼️' }),
            ]}
          />
        </Editor>
      </div>
      <div className="h-5" />
      <Row time={time}>
        <div data-part="content" className="self-start rounded-md px-1 outline-3 outline-[#5bc0eb]">
          <Markdown text="🎉🎉 **GIVEAWAY MỚI** 🎉🎉" />
        </div>
        <div data-part="embed" className="self-start rounded-md p-1 outline-3 outline-[#fff08a]">
          <EmbedPreview embed={giveawayEmbed('free chit', new Date(Date.now() + 60_000), 'Số người tham gia: **0**', time)} />
        </div>
        <LayoutPreview components={[buttons({ label: 'Tham gia Giveaway!', emoji: '🎉', style: 3 }, { label: 'Người tham gia', emoji: '👦' })]} />
      </Row>
      <svg ref={svg} className="pointer-events-none absolute inset-0 size-full overflow-visible" />
    </div>
  )
}

const text = (content: string): LayoutComponent => ({ type: 10, content }) as LayoutComponent
const gallery = (...urls: string[]): LayoutComponent => ({ type: 12, items: urls.map((url) => ({ media: { url } })) }) as LayoutComponent
const separator: LayoutComponent = { type: 14, divider: true, spacing: 1 } as LayoutComponent

const section: LayoutComponent[] = [
  {
    type: 9,
    components: [text('Chào mừng **tudubucket** đã đến với server!\n- 🧯 Để yêu cầu support, gửi tin nhắn tại <#101>\n- 💬 Tham gia chat với mọi người tại <#102>')],
    accessory: { type: 11, media: { url: tudubucketAvatar } },
  } as LayoutComponent,
  separator,
  {
    type: 9,
    components: [text('Để xem các module của bot, bạn có thể đọc thêm tại đây nhé!!')],
    accessory: { type: 2, style: 5, label: 'Tài liệu', url: 'https://bot.tudubucket.dev/docs', emoji: { id: null, name: '📖' } },
  } as LayoutComponent,
]

const container: LayoutComponent[] = [
  {
    type: 17,
    components: [
      gallery(componentsBanner),
      text('**Giới thiệu các thành phần mới cho tin nhắn!**\nTrước đây, hệ thống thành phần cũ dù **hoạt động ổn định**, nhưng vẫn có **nhiều hạn chế**.\nNội dung, tệp đính kèm, embed và các thành phần khác **phải tuân theo vị trí cố định**.'),
      gallery(panels),
      text('Hệ thống thành phần mới trên đây **đã khắc phục hoàn toàn các giới hạn đó**, với **các thành phần có thể kết hợp tự do (fully composable)** - bạn có thể **sắp xếp, bố trí** theo bất kỳ thứ tự nào, tạo nên **thiết kế linh hoạt và hấp dẫn hơn về mặt trực quan**.'),
      separator,
      { type: 9, components: [text('Tài liệu liên quan về các thành phần mới:')], accessory: { type: 2, style: 5, label: 'Overview', url: 'https://discord.com' } },
      { type: 9, components: [text('Danh sách các thành phần mới:')], accessory: { type: 2, style: 5, label: 'Reference', url: 'https://discord.com' } },
    ],
  } as LayoutComponent,
]

const welcome: LayoutComponent[] = [
  {
    type: 17,
    components: [
      gallery(banner),
      text(`### ✉️ This message has been sent from <:owner:1267138666128474215> ${BRAND.name} development team`),
      separator,
      {
        type: 9,
        components: [text(`Hello there! Thank you very much for added **${BRAND.name}** to **BucketLaboratory** <:yaya:1267138629608931338>\n\nIf you have any questions, feel free to reach us at our [Support Server](https://bot.tudubucket.dev/support) anytime!`)],
        accessory: { type: 11, media: { url: gura } },
      },
      buttons(
        { label: 'Docs', emoji: '📚', style: 5, url: 'https://bot.tudubucket.dev/docs' },
        { label: 'Support', emoji: '🧯', style: 5, url: 'https://bot.tudubucket.dev/support' },
        { label: 'Premium', emoji: '👑', style: 5, url: 'https://bot.tudubucket.dev/premium' },
        { label: 'Terms', emoji: '📃', style: 5, url: 'https://bot.tudubucket.dev/docs' },
      ),
      separator,
      text('We have automatically detected your server language is English, US (English, US), so your server will use our default language configuration.\nTo change application\'s setting about localization, you can use </language server:1> or </language me:1>, or select here:'),
      { type: 1, components: [{ type: 3, custom_id: 'lang', placeholder: 'Tiếng Việt', options: [{ label: 'Tiếng Việt', value: 'vi', emoji: { id: null, name: '🇻🇳' }, default: true }] }] },
    ],
  } as LayoutComponent,
]

const Layout = ({ time, components }: { time: Date; components: LayoutComponent[] }) => (
  <div className="w-[720px] py-4">
    <Row time={time} h12>
      <LayoutPreview components={components} />
    </Row>
  </div>
)

function Shots() {
  useEffect(() => {
    if ((window as any).__started) return
    ;(window as any).__started = true
    const done = async () => {
      await document.fonts.ready
      for (const img of document.images) img.loading = 'eager'
      await Promise.race([Promise.all([...document.images].map((img) => (img.complete ? null : img.decode().catch(() => null)))), new Promise((r) => setTimeout(r, 6000))])
      // preview không biết tên kênh, điền tên kênh như ảnh chụp cũ
      const names = ['🤔 | help-me', '💬 | general']
      const section = document.querySelector('[data-shot="layouts/section"]')!
      const chips = [...section.querySelectorAll('span')].filter((el) => !el.children.length && el.textContent?.startsWith('#'))
      chips.forEach((el, i) => names[i] && (el.textContent = `# ${names[i]}`))
      // gallery 9 ảnh gura xếp 3x3, ảnh chỉ giữ hàng đầu
      const shot = document.querySelector<HTMLElement>('[data-shot="layouts/media_gallery"]')!
      const gura = [...shot.querySelectorAll('img')].filter((img) => img.src.includes('gura_bounce'))
      if (gura.length) {
        const top = shot.getBoundingClientRect().top
        Object.assign(shot.style, { height: `${gura[0].getBoundingClientRect().bottom - top + 16}px`, overflow: 'hidden' })
      }
      // ảnh giveaway cũ chụp với đồng hồ 24 giờ
      for (const giveaway of document.querySelectorAll('[data-shot^="giveaway/"]')) {
        const walker = document.createTreeWalker(giveaway, NodeFilter.SHOW_TEXT)
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          node.textContent = node.textContent!
            .replace(/\b(\d{1,2}):(\d{2})\s(AM|PM)\b/g, (_, h, m, p) => `${String((Number(h) % 12) + (p === 'PM' ? 12 : 0)).padStart(2, '0')}:${m}`)
            .replace(/in (1 minute|\d+ seconds)/, 'in a minute')
        }
      }
      // emoji yaya lấy ảnh tĩnh .png theo id
      for (const img of document.querySelectorAll<HTMLImageElement>('img[src*="1267138629608931338"]')) {
        img.src = 'https://cdn.discordapp.com/emojis/1267138629608931338.png'
        await img.decode().catch(() => null)
      }
      ;(window as any).__ready = true
    }
    setTimeout(done, 600)
  }, [])
  return (
    <MentionProvider users={USERS}>
      <div style={{ display: 'grid', gap: 24, padding: 24, justifyContent: 'start' }}>
        <Shot id="giveaway/customize">
          <div className="w-[760px] py-4">
            <Row time={at(20, 30)} used="/giveaway messages">
              <EmbedPreview
                embed={{
                  color: 0x2b2d31,
                  title: 'Chỉnh sửa tin nhắn Giveaway',
                  description: 'Bạn đang thực hiện custom message cho các giveaway.\nServer hiện đang **TẮT** custom message.\n\nHãy chọn phần tin nhắn giveaway bạn muốn chỉnh sửa, hoặc bật/tắt custom message cho giveaway ở dưới:',
                }}
              />
              <LayoutPreview components={[buttons({ label: 'Bật/Tắt Custom Message', emoji: '🔄', style: 1 }, { label: 'Tài liệu (docs)', emoji: '📖', style: 5, url: 'https://bot.tudubucket.dev/docs' })]} />
              <OpenSelect placeholder="Chọn loại tin nhắn giveaway cần sửa" options={Object.values(OPTIONS)} />
            </Row>
          </div>
        </Shot>
        <Shot id="giveaway/definition">
          <Definition />
        </Shot>
        <Shot id="giveaway/running">
          <Stage option={OPTIONS.running}><Running /></Stage>
        </Shot>
        <Shot id="giveaway/finished">
          <Stage option={OPTIONS.finished}><Finished /></Stage>
        </Shot>
        <Shot id="giveaway/no_winner">
          <Stage option={OPTIONS.no_winner}><NoWinner /></Stage>
        </Shot>
        <Shot id="giveaway/no_winner_reply">
          <Stage option={OPTIONS.no_winner_reply}>
            <Row time={at(20, 42)} reply={ENDED}>
              <EmbedPreview
                embed={{
                  color: 0x2b2d31,
                  title: 'Không thể kết thúc giveaway...',
                  description: 'Không có đủ người tham gia để xác định người chiến thắng cho [giveaway này](https://discord.com), ;(',
                  footer: { text: BRAND.name, icon_url: botAvatar },
                  timestamp: at(20, 42).toISOString(),
                }}
              />
            </Row>
          </Stage>
        </Shot>
        <Shot id="giveaway/rolled">
          <Stage option={OPTIONS.rolled}>
            <Row time={at(20, 54)} reply={ENDED} highlight>
              <Markdown text="🎉 [Giveaway](https://discord.com) **dog** được tổ chức bởi <@1> đã kết thúc với người chiến thắng: <@1>. Chúc mừng! 🎉" />
              <LayoutPreview components={[buttons({ label: 'Reroll Giveaway', style: 3 })]} />
            </Row>
          </Stage>
        </Shot>
        <Shot id="giveaway/rerolled">
          <Stage option={OPTIONS.rerolled}>
            <Row time={at(20, 56)} highlight>
              <Markdown text="🎉 Giveaway đã được quay lại bởi <@1>. Chúc mừng <@1>!" />
              <LayoutPreview components={[buttons({ label: 'Reroll Giveaway', style: 3 })]} />
            </Row>
          </Stage>
        </Shot>
        <Shot id="giveaway/diff">
          <div className="flex gap-6 px-4">
            <Stage option={OPTIONS.running}><Running /></Stage>
            <Stage option={OPTIONS.no_winner}><NoWinner /></Stage>
            <Stage option={OPTIONS.finished}><Finished /></Stage>
          </div>
        </Shot>
        <Shot id="layouts/text_display">
          <Layout time={at(13, 38)} components={[text('Hello World!')]} />
        </Shot>
        <Shot id="layouts/separator">
          <Layout time={at(21, 29)} components={[text('Bắc Triều Tiên'), separator, text('Nam Triều Tiên')]} />
        </Shot>
        <Shot id="layouts/section">
          <Layout time={at(23, 16)} components={section} />
        </Shot>
        <Shot id="layouts/media_gallery">
          <Layout time={at(23, 51)} components={[gallery(banner), gallery(...Array(9).fill('https://cdn.tudubucket.dev/gura_bounce.gif'))]} />
        </Shot>
        <Shot id="layouts/container">
          <Layout time={at(0, 15)} components={container} />
        </Shot>
        <Shot id="layouts/component_v2_message">
          <div className="flex items-start gap-8 pr-6">
            <Layout time={at(13, 39)} components={welcome} />
            <img src={official} alt="" className="mt-2 w-[600px]" />
          </div>
        </Shot>
      </div>
    </MentionProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Shots />
  </StrictMode>,
)
