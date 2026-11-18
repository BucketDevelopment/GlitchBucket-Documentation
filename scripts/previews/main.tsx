import { Fragment, StrictMode, useEffect, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './preview.css'
import {
  DiscordMessage,
  EmbedPreview,
  LayoutPreview,
  Markdown,
  MentionProvider,
} from '@/components/discord-preview'
import type { DiscordEmbed, LayoutComponent } from '@/lib/contracts'
import palette from '@dashboard/../docs/discord-palette.json'
import { Twemoji } from '@/lib/twemoji'
import { BRAND } from '../../web/data/brand.mjs'
import uwuAvatar from './uwu.png'
import wowieAvatar from './wowie.webp'
import tudubucketAvatar from './tudubucket.webp'
import kissFrame from './kiss.webp'
import quoteImage from './quote.png'

const brandFiles = import.meta.glob('../../public/brand/*', { eager: true, query: '?url', import: 'default' })
const botAvatar = brandFiles[`../../public${BRAND.botAvatar}`] as string
const theme = new URLSearchParams(location.search).get('theme') === 'light' ? 'light' : 'ash'

const now = Math.floor(Date.now() / 1000)
const SERVER = 'BucketDevelopment'
const USERS = { '1': 'tudubucket', '2': 'GlitchBucket', '3': 'wowie', '1531516242974736456': 'Modun', '669044659426820106': 'Skel', '682952656704372737': 'Kev' }
const ROLES = [
  { id: '10', name: 'Member', color: 0x57f287 },
  { id: '11', name: 'Booster', color: 0xf47fff },
  { id: '12', name: 'Hỗ trợ Ticket', color: 0x8ea1ff },
  { id: '13', name: 'trolled', color: 0x99aab5 },
  { id: '14', name: 'bucket gang', color: 0xe67ea9 },
]

type Button = { label?: string; emoji?: string; style?: number }
const buttons = (...list: Button[]): LayoutComponent => ({
  type: 1,
  components: list.map((b, i) => ({
    type: 2,
    custom_id: `b${i}`,
    style: b.style ?? 2,
    label: b.label,
    emoji: b.emoji ? { id: null, name: b.emoji } : null,
  })),
} as LayoutComponent)
const footer = (text: string) => ({ text: `${BRAND.name} • ${text}`, icon_url: botAvatar })

function Shot({ id, children, trigger, reply, reactions, maxHeight }: {
  id: string
  children: ReactNode
  maxHeight?: number
  trigger?: { text: string; reactions?: string[] }
  reply?: 'mention' | 'silent'
  reactions?: string[]
}) {
  return (
    <section data-shot={id} style={{ width: 600, maxHeight, overflow: maxHeight ? 'hidden' : undefined }}>
      <DiscordMessage
        bare
        className="rounded-none border-0 shadow-none"
        botName={BRAND.name}
        botAvatar={botAvatar}
        extras={{
          trigger: trigger ? { text: trigger.text, reactions: trigger.reactions ?? [], deleted: false } : null,
          reply: reply ?? null,
          reactions,
        }}
      >
        {children}
      </DiscordMessage>
    </section>
  )
}

const ticketPanel: DiscordEmbed = {
  color: 0xc0cdff,
  title: '🎫 Trung tâm hỗ trợ',
  description: 'Cần giúp gì thì chọn đúng mục bên dưới nhé, bot sẽ mở một kênh riêng cho bạn và staff ngay.',
  footer: { text: BRAND.name, icon_url: botAvatar },
}

const FORM_ANSWERS = ['cho tao admin', '']

const ticketOpen: DiscordEmbed = {
  color: 0xc0cdff,
  title: 'Khu vực hỗ trợ',
  description: 'Chờ một chút và đội ngũ hỗ trợ sẽ đến hỗ trợ bạn nhé! Và hãy đảm bảo rằng bạn đã đọc kĩ luật khi tạo ticket.',
  fields: [
    { name: 'Ticket số', value: '128', inline: true },
    { name: 'Người mở ticket', value: '<@1> (tudubucket)', inline: true },
    { name: 'Thời gian mở', value: `<t:${now}:F>`, inline: true },
  ],
  footer: { text: BRAND.name, icon_url: botAvatar },
}

const ticketForm: DiscordEmbed = {
  title: 'Thông tin ticket',
  color: 0xf1c40f,
  fields: [
    { name: 'Vấn đề của bạn', value: FORM_ANSWERS[0], inline: false },
    { name: 'Mô tả thêm', value: FORM_ANSWERS[1] || '*Không cung cấp*', inline: false },
  ],
}

// số đo và màu lấy từ modal thật của Discord (theme ash), ô đã nhập thì chữ màu #efeff1
function FormModal() {
  return (
    <section data-shot="ticket-form" style={{ width: 480 }}>
      <div className="flex flex-col bg-[#242429] pt-2 pb-4 font-discord text-base leading-4 text-[#efeff1]">
        <header className="flex items-start px-6 pt-4 pb-2">
          <img src={botAvatar} alt="" className="mt-1 mr-3 size-6 rounded-full object-cover" />
          <h1 className="flex-1 text-2xl leading-8 font-semibold text-[#fbfbfb]">Hỗ trợ</h1>
          <span className="-mt-4 -mr-4 flex size-10 items-center justify-center text-[#abacb2]">
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
              <path fill="currentColor" d="M19.3 20.7a1 1 0 0 0 1.4-1.4L13.42 12l7.3-7.3a1 1 0 0 0-1.42-1.4L12 10.58l-7.3-7.3a1 1 0 0 0-1.4 1.42L10.58 12l-7.3 7.3a1 1 0 1 0 1.42 1.4L12 13.42l7.3 7.3Z" />
            </svg>
          </span>
        </header>
        <main className="px-6 pt-4">
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-[#f9a200]/32 bg-[#f2a600]/8 p-3">
            <svg viewBox="0 0 24 24" className="mt-px size-4 shrink-0" aria-hidden>
              <path fill="#ea9800" fillRule="evenodd" clipRule="evenodd" d="M10 3.1a2.37 2.37 0 0 1 4 0l8.71 14.75c.84 1.41-.26 3.15-2 3.15H3.29c-1.74 0-2.84-1.74-2-3.15L9.99 3.1Zm3.25 14.65a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM13.06 14l.37-5.94a1 1 0 0 0-1-1.06h-.87a1 1 0 0 0-1 1.06l.38 5.94a1.06 1.06 0 0 0 2.12 0Z" />
            </svg>
            <div className="text-sm leading-[18px] text-[#fbfbfb]">
              This form will be submitted to <strong className="font-semibold">{BRAND.name}</strong>. Do not share passwords or other sensitive information.
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="pt-1">
              <h2 className="mb-2 text-base leading-5 font-medium text-[#fbfbfb]">
                Vấn đề của bạn<span className="pl-1 text-[#f87e7a]">*</span>
              </h2>
              <div className="flex min-h-10 items-center rounded-lg border border-[#9696a0]/20 bg-black/12 px-3 leading-5">{FORM_ANSWERS[0]}</div>
            </div>
            <div className="pt-1">
              <h2 className="mb-2 text-base leading-5 font-medium text-[#fbfbfb]">Mô tả thêm</h2>
              <div className="min-h-[90px] rounded-lg border border-[#9696a0]/20 bg-black/12 px-[10px] py-3 leading-5">
                {FORM_ANSWERS[1] || <span className="text-[#8f9097]">Kể thêm chi tiết nếu có</span>}
              </div>
            </div>
          </div>
        </main>
        <footer className="flex gap-2 px-6 pt-4 pb-2">
          <span className="flex h-10 flex-1 items-center justify-center rounded-lg border border-[#999999]/4 bg-[#94949c]/12 leading-5 font-medium text-[#fbfbfb]">Cancel</span>
          <span className="flex h-10 flex-1 items-center justify-center rounded-lg border border-white/8 bg-[#5865f2] leading-5 font-medium text-white">Submit</span>
        </footer>
      </div>
    </section>
  )
}

const giveaway: DiscordEmbed = {
  color: 0xc0cdff,
  author: { name: SERVER },
  title: 'Nitro 1 tháng 🎁',
  description: `- Tổ chức bởi: <@1>\n- Thời lượng: 1 ngày (Kết thúc: <t:${now + 82800}:R>)`,
  fields: [
    { name: 'Yêu cầu', value: '- Đã ở trong server ít nhất **3 ngày**\n- Có một trong các role sau: <@&10>', inline: false },
    { name: 'Lượt tham gia bonus', value: '<@&11>: +2 lượt tham gia', inline: true },
    { name: 'Danh sách đen', value: 'Có một trong các role sau: <@&13>', inline: true },
  ],
  footer: footer('1 Người chiến thắng'),
}

// dữ liệu vote lấy từ một lượt /voting statistics thật
const VOTES: [string, string, number, number, number, number][] = [
  ['🥇', 'hotmangsupreme', 1030, 55, 0, 24],
  ['🥈', 'ahihinguoiyeuculadoconchos', 948, 49, 0, 23],
  ['🥉', 'forgivemeifucan._', 239, 6, 0, 2],
  ['4️⃣', '3bilowki', 210, 4, 0, 0],
  ['5️⃣', 'ekeoj', 146, 1, 0, 0],
  ['6️⃣', 'sorynqx', 95, 4, 0, 3],
  ['7️⃣', '16ymrx', 76, 3, 0, 3],
  ['8️⃣', 'cauchantodi09_', 74, 11, 0, 6],
  ['9️⃣', 'muafdongvanganh', 49, 2, 0, 1],
  ['🔟', 'knowze.', 44, 2, 0, 1],
]
const voting: DiscordEmbed = {
  color: 0xf1c40f,
  author: { name: 'Camelliera' },
  title: 'Số lượt Vote',
  description: VOTES.map(
    ([medal, user, valid, left, fresh, young]) =>
      `${medal} \`@${user}\`: \`${valid}\` hợp lệ, \`${left}\` thoát, \`${fresh}\` th.viên mới, \`${young}\` t.khoản mới`,
  ).join('\n'),
  footer: footer('Trang 1/10 • 94 Tin nhắn\nDữ liệu được cập nhật theo thời gian thực'),
  timestamp: new Date().toISOString(),
}

const customrole: DiscordEmbed = {
  color: 0xe67ea9,
  author: { name: SERVER },
  title: 'Thông tin Custom Role cho @tudubucket',
  fields: [
    { name: 'Người sở hữu', value: '<@1>: <@&14>', inline: true },
    { name: 'Màu', value: '#E67EA9', inline: true },
    { name: 'Số lượng thành viên tối đa', value: '3 (Hiện tại: 2 Thành viên)', inline: true },
    { name: 'Được tạo vào', value: `<t:${now - 86400 * 12}:D>`, inline: true },
    { name: 'Hết hạn trong', value: `<t:${now + 86400 * 18}:R>`, inline: true },
    { name: 'Quyền được cấp', value: '✅ Chỉnh sửa tên vai trò\n✅ Chỉnh sửa màu vai trò\n✅ Quản lý thành viên của vai trò', inline: false },
  ],
  footer: footer('Custom Role'),
}

const AUTORESPONDER = [
  'Tôi - sẽ xóa <@2>! ra khỏi cuộc đời tôi...',
  'Ấn nút Xóa.......',
  'Loading : 1%...........10%..............30%..................66%.............70%..........90%...........99,9999% ..... ',
  'No delete😇 Không thể xoá <@2>😂  vì  <@2>..! như 1 con virut ăn sâu vào trong trái tim tôi làm tôi không bao giờ hết yêu😍 , không bao giờ xóa đc hình bóng .🤢 Bởi vì tôi không thể ngừng nghĩ đến nó 🥵 ∗ Tôi + <@2> = 1 tình yêu không bao giờ tắt ∗🩷 💖',
].join('\n')

const welcome: LayoutComponent[] = [
  {
    type: 17,
    accent_color: 0xc0cdff,
    components: [
      {
        type: 9,
        components: [
          { type: 10, content: '### Chào mừng tới BucketDevelopment! 👋' },
          { type: 10, content: 'Đọc luật rồi lấy role ở bên dưới là chơi được rồi nè. Tối nay 9h có event ma sói, nhớ ghé nha!' },
        ],
        accessory: { type: 11, media: { url: botAvatar } },
      },
      { type: 14, divider: true, spacing: 1 },
      { type: 10, content: '-# Bạn là member thứ **12.840** của server' },
    ],
  } as LayoutComponent,
  buttons({ label: 'Luật server', emoji: '📜' }, { label: 'Lấy role', emoji: '🎭', style: 1 }),
]

const TICKET_OPTIONS: [string, string, string][] = [
  ['💬', 'Hỗ trợ', 'Hỏi đáp, báo lỗi, khiếu nại'],
  ['🛒', 'Mua hàng', 'Đơn hàng, thanh toán'],
  ['🤝', 'Đối tác', 'Hợp tác, quảng bá server'],
]

// các lượt cuối của phiên nối từ hiện tại ở server hạng 2 bảng streak (18/11/2026), tên và avatar lấy từ chính server đó
const PLAYERS = [
  { name: '=W=', avatar: 'https://cdn.discordapp.com/avatars/1166219688246775869/c7581a4581cb4475cbe397d79bd9d211.webp?size=128' },
  { name: 'S0nvjppr0', avatar: 'https://cdn.discordapp.com/avatars/970680087777271858/984066b5e28688bcd4a74140a24014fc.webp?size=128' },
  { name: '! Mèo Meo', avatar: 'https://cdn.discordapp.com/avatars/911847701778427926/962d4b20fef2ace31601ce1f347e9d16.webp?size=128' },
  { name: 'khiem nguyen', avatar: 'https://cdn.discordapp.com/embed/avatars/1.png' },
]
const CHAIN: [number, string, number][] = [
  [0, 'ngợi khen', 45],
  [1, 'khen ngợi', 46],
  [0, 'ngợi ca', 47],
  [2, 'ca li', 48],
  [1, 'li dị', 49],
  [3, 'dị ứng', 50],
  [1, 'ứng xử', 51],
]
const MILESTONE = 50
// emoji thay cho chữ số bị lặp, giống bot: Discord không cho hai reaction trùng nhau trên một tin
const REPEAT_DIGITS = ['🥚', '🥇', '🥈', '🥉', '🍀', '🖐️', '🕡', '🌈', '🎱', '🕤']
const KEYCAPS = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
function streakReactions(streak: number) {
  const seen = new Set<string>()
  return ['✅', ...[...String(streak)].map((digit) => {
    const emoji = seen.has(digit) ? REPEAT_DIGITS[Number(digit)] : KEYCAPS[Number(digit)]
    seen.add(digit)
    return emoji
  })]
}

// số đo và màu lấy từ select menu thật của Discord (theme ash): danh sách là một khối nổi tách khỏi ô chọn
function OpenSelect({ placeholder, options }: { placeholder: string; options: [string, string, string][] }) {
  return (
    <div className="w-[400px] max-w-full">
      <div className="flex min-h-10 items-center gap-2 rounded-lg border border-[#9696a0]/20 bg-black/12 py-2 pr-2 pl-3 font-medium">
        <span className="flex-1 truncate text-base leading-4 text-[#abacb2]">{placeholder}</span>
        <svg viewBox="0 0 24 24" className="size-[18px] rotate-180 text-[#efeff1]" fill="currentColor" aria-hidden>
          <path d="M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.29 5.3-5.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.42Z" />
        </svg>
      </div>
      <div className="mt-2 overflow-hidden rounded-lg border border-[#94949c]/12 bg-[#28282d]">
        {options.map(([emoji, label, description], index) => (
          <div key={label} className={`flex items-center p-2 ${index === 0 ? 'bg-[#9696a0]/20' : ''}`}>
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

const clock = () => new Date().toTimeString().slice(0, 5)

type Tag = { text: string; badge: string }
type Person = { name: string; avatar: string; color?: string; tag?: Tag; decoration?: string; font?: string }
type Used = { by: Person; command: string; target: Person; text: string }

// guild tag cạnh tên, số đo lấy từ CSS của Discord (chip nền background-mod-strong, chữ 0.72rem, badge 12px)
function GuildTag({ tag, className = '' }: { tag: Tag; className?: string }) {
  return (
    <span className={`text-[0.72rem] ${className}`}>
      <span className="relative -mt-0.5 inline-flex items-center rounded-[4px] bg-[#97979f]/20 px-1 align-middle leading-4">
        <img src={tag.badge} alt="" className="mr-0.5 size-3 align-middle" />
        <span className="inline-flex max-w-[70px] items-center leading-4 font-semibold text-[#efeff1]">{tag.text}</span>
      </span>
    </span>
  )
}

// chữ có *nghiêng* như Discord, dùng cho dòng xem trước tin nhắn một hàng
const italics = (text: string) => text.split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))

function Row({ avatar, name, color, tag, decoration, font, bot, replyTo, used, reactions = [], reacted, children }: Person & { bot?: boolean; replyTo?: Person & { text: string }; used?: Used; reactions?: string[]; reacted?: boolean; children: ReactNode }) {
  return (
    <div className="relative min-w-0 py-0.5 pr-4 pl-[72px]">
      {used && (
        <div className="relative mb-1 flex h-[18px] items-center text-sm leading-[18px] whitespace-pre text-[#efeff1]">
          <span className="absolute top-2 -left-[37px] h-3 w-[33px] rounded-tl-[6px] border-t-2 border-l-2 border-[#474851]" />
          <img src={used.by.avatar} alt="" className="mr-1 size-4 shrink-0 rounded-full object-cover" />
          <span className="mr-1 shrink-0 font-medium text-[#abacb2]">{used.by.name}</span>
          <span className="mr-1 shrink-0">used</span>
          <span className="shrink-0 text-[#4d96ee]">{used.command}</span>
          <svg viewBox="0 0 24 24" className="mx-0.5 size-4 shrink-0 text-[#abacb2]" aria-hidden>
            <path fill="currentColor" d="M9.3 5.3a1 1 0 0 0 0 1.4l5.29 5.3-5.3 5.3a1 1 0 1 0 1.42 1.4l6-6a1 1 0 0 0 0-1.4l-6-6a1 1 0 0 0-1.42 0Z" />
          </svg>
          <img src={used.target.avatar} alt="" className="mr-1 ml-0.5 size-4 shrink-0 rounded-full object-cover" />
          {used.target.tag && <GuildTag tag={used.target.tag} className="mr-1 shrink-0" />}
          <span className="truncate">{italics(used.text)}</span>
        </div>
      )}
      {replyTo && (
        <div className="relative mb-1 flex h-[18px] items-center text-sm leading-[18px] whitespace-pre text-[#efeff1]">
          <span className="absolute top-2 -left-[37px] h-3 w-[33px] rounded-tl-[6px] border-t-2 border-l-2 border-[#474851]" />
          <img src={replyTo.avatar} alt="" className="mr-1 size-4 shrink-0 rounded-full object-cover" />
          <span className="mr-1 shrink-0 font-medium text-[#fbfbfb]" style={replyTo.color ? { color: replyTo.color } : undefined}>@{replyTo.name}</span>
          {replyTo.tag && <GuildTag tag={replyTo.tag} className="mr-1 ml-0.5 shrink-0" />}
          <span className="truncate">{replyTo.text}</span>
        </div>
      )}
      <div className="relative">
        <img src={avatar} alt="" className="absolute top-0.5 -left-14 size-10 rounded-full object-cover" />
        {decoration && <img src={decoration} alt="" className="absolute -top-0.5 -left-[60px] size-12" />}
        <h3 className="h-[22px] text-base leading-[22px] whitespace-nowrap">
          <span className="mr-1">
            <span className="font-medium text-[#fbfbfb]" style={{ color, fontFamily: font }}>{name}</span>
            {tag && <GuildTag tag={tag} className="ml-1.5" />}
            {bot && (
              <span className="relative top-[1.6px] mt-0.5 ml-1 inline-flex h-[15px] items-center rounded-[4px] bg-[#5865f2] px-[4.4px] align-top text-white">
                <svg viewBox="0 0 24 24" className="-mt-[0.32px] -ml-[3.2px] block size-4" aria-hidden>
                  <path fill="currentColor" fillRule="evenodd" d="M19.06 6.94a1.5 1.5 0 0 1 0 2.12l-8 8a1.5 1.5 0 0 1-2.12 0l-4-4a1.5 1.5 0 0 1 2.12-2.12L10 13.88l6.94-6.94a1.5 1.5 0 0 1 2.12 0Z" />
                </svg>
                <span className="block text-[12.8px] leading-[15px] font-semibold">APP</span>
              </span>
            )}
          </span>
          <span className="ml-1 inline-block h-5 text-xs leading-[22px] font-medium text-[#81828a]">{clock()}</span>
        </h3>
        <div className="text-base leading-[22px]">{children}</div>
        {reactions.length > 0 && (
          <div className="pb-0.5">
            <div className="-mb-2 flex flex-wrap pt-0.5 pb-1.5">
              {reactions.map((emoji) => (
                <span key={emoji} className={`mr-1 mb-1 inline-flex items-center rounded-lg border px-1.5 py-0.5 ${reacted ? 'border-[#5865f2] bg-[#5864f2]/24' : 'border-transparent bg-[#94949c]/12'}`}>
                  <Twemoji emoji={emoji} className="my-0.5 size-5" />
                  <span className={`ml-1.5 min-w-3 text-center text-base leading-4 font-semibold [text-rendering:optimizeLegibility] ${reacted ? 'text-[#b9c8ff]' : 'text-[#abacb2]'}`}>1</span>
                </span>
              ))}
              <span className="mr-1 mb-1 inline-flex items-center rounded-lg border border-transparent bg-[#94949c]/12 px-[7px] py-[5px] text-[#abacb2]">
                <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
                  <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22ZM6.5 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-9.8 1.17a1 1 0 0 1 1.39.27 3.5 3.5 0 0 0 5.82 0 1 1 0 0 1 1.66 1.12 5.5 5.5 0 0 1-9.14 0 1 1 0 0 1 .27-1.4Z" />
                </svg>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const Follow = ({ children }: { children: ReactNode }) => <div className="py-0.5 pr-4 pl-[72px] text-base leading-[22px]">{children}</div>
const BotEmbed = ({ embed }: { embed: DiscordEmbed }) => (
  <Row avatar={botAvatar} name={BRAND.name} bot>
    <div className="flex flex-col gap-0.5 pt-0.5"><EmbedPreview embed={embed} /></div>
  </Row>
)

// user thật trong ảnh mẫu: tên và màu role theo server chụp ảnh (BucketDevelopment, ⛩・Kramos), avatar và guild tag lấy từ Discord (18/11/2026)
const discordCdn = (path: string) => `https://cdn.discordapp.com/${path}`
const FUN: Record<string, Person> = {
  tudubucket: { name: 'tudubucket', color: '#f1c40f', avatar: tudubucketAvatar },
  modun: { name: 'Modun', color: '#2ecc71', avatar: discordCdn('avatars/1531516242974736456/31d752365d58991a3c40602e7e54d6a8.webp?size=128'), tag: { text: 'MLBB', badge: discordCdn('guild-tag-badges/342452785658331137/6473797948e6d36a991e425c8b7c353c.png?size=16') } },
  acurse: { name: 'Acurse', color: '#ff0000', avatar: discordCdn('avatars/478075011115122698/4613822cdcfca8027a1a2c20cc66289e.webp?size=128') },
  skel: { name: 'Skel', avatar: discordCdn('avatars/669044659426820106/9a8ac9b54ca7d069e77d2a262b83473a.webp?size=128') },
  zackwo: {
    name: 'zackwo',
    avatar: discordCdn('avatars/1201265652166570106/3c1a6ce14f3f769cf3fcf43e784e5a46.webp?size=128'),
    decoration: discordCdn('avatar-decoration-presets/a_a87e3efa4de2956331831681231ce63b.png?size=96&passthrough=false'),
    tag: { text: 'zyo', badge: discordCdn('guild-tag-badges/1315649227900059718/f98b3a6b42d732e9476bb7f9dc907133.png?size=16') },
  },
  kev: { name: 'Kev', color: '#6e00c1', avatar: discordCdn('avatars/682952656704372737/d5464c9449845fd549f692779df7c8c3.webp?size=128'), tag: { text: 'MERC', badge: discordCdn('guild-tag-badges/1313401774907850822/dc61eaed9e8b012148661df1ada874e6.png?size=16') } },
}
const psize: DiscordEmbed = {
  color: 0x41f23a,
  title: '🔬  Peni Size',
  description: '## `8=D`\n**1 cm** - uh.... 🔬🔬🔎🔎',
  timestamp: new Date().toISOString(),
  footer: { text: FUN.modun.name, icon_url: FUN.modun.avatar },
}
const gayrate: DiscordEmbed = {
  color: 0xa020f0,
  title: '💅  Gay Rate',
  description: '```' + '🏳️‍🌈'.repeat(20) + '```\n**100%** - freaky ahh dog',
  timestamp: new Date().toISOString(),
  footer: { text: FUN.skel.name, icon_url: FUN.skel.avatar },
}
const QUOTE = 'ch.. chan... chan tớ đi!! ~i cư i cư kawaiii~~,c... cậu .. cậu biết bố tớ là ai hong!! ~... kawaii!! *chu mỏ cute kawaii dễ huông*hứ!!... b.. ba.. baka!! ~*lạnh lùng phồng má khoanh tay*'
const kiss: DiscordEmbed = {
  color: 0xd0168c,
  description: '<@669044659426820106> is going to kiss <@682952656704372737>!',
  image: { url: kissFrame },
}

// layout thật của các server, số thứ tự theo trang layouts.html (đã xếp theo độ đẹp); cần layouts.local.json mới render được
const SHOWCASE = [2, 7, 13, 17, 19, 20, 21, 40]
type GalleryEntry = { n: number; components: LayoutComponent[] }
const gallery = (Object.values(import.meta.glob('./layouts.local.json', { eager: true, import: 'default' }))[0] ?? []) as GalleryEntry[]
const MAX_LINES = 10

// text display quá dài thì chỉ giữ các dòng đầu, không sửa chữ
function trim(components: LayoutComponent[]): LayoutComponent[] {
  return components.map((component) => {
    const next = { ...component } as LayoutComponent & { content?: string; components?: LayoutComponent[] }
    if (component.type === 10 && typeof component.content === 'string') {
      const lines = component.content.split('\n')
      if (lines.length > MAX_LINES) next.content = lines.slice(0, MAX_LINES).join('\n')
    }
    if (Array.isArray(component.components)) next.components = trim(component.components)
    return next
  })
}

const VOICE_EMOJI = [
  ['1567370232438460456', '1567370229829607494', '1567370234657112134', '1567370217133187213', '1567370258493472868'],
  ['1567370256274694174', '1567370262423281705', '1567370225635295262', '1567370227908354108', '1567370236175585311'],
  ['1567370219197042890', '1567370260519190550', '1567370221512294460', '1567370241107824660', '1567370223571435632'],
]
const tempvoice: LayoutComponent[] = [
  {
    type: 17,
    components: [
      {
        type: 10,
        content:
          '## Kênh voice tạm thời\nQuản lý temp voice của bạn bằng các nút bên dưới, hoặc dùng lệnh **`/voice`** với các tùy chọn tương tự.\n\n<@1> đây là voice của bạn, hãy quản lý bằng các nút bên dưới.\n-# Để gửi tin nhắn TTS, hãy ping bot kèm nội dung hoặc dùng lệnh **`/tts enable`**.',
      },
      { type: 14, divider: true, spacing: 1 },
      { type: 12, items: [{ media: { url: 'https://cdn.tudubucket.dev/tempvoice/interface-v4.png' } }] },
    ],
  } as LayoutComponent,
  ...VOICE_EMOJI.map((row) => ({
    type: 1,
    components: row.map((id) => ({ type: 2, custom_id: id, style: 2, emoji: { id, name: '_' } })),
  }) as LayoutComponent),
]

function Shots() {
  useEffect(() => {
    // StrictMode chạy effect hai lần, đổi màu hai lần sẽ coi màu light là màu ash
    if ((window as any).__started) return
    ;(window as any).__started = true
    const done = async () => {
      await document.fonts.ready
      for (const img of document.images) img.loading = 'eager'
      const images = Promise.all([...document.images].map((img) => (img.complete ? null : img.decode().catch(() => null))))
      await Promise.race([images, new Promise((r) => setTimeout(r, 4000))])
      // tên user trong bảng vote là link tới profile: chữ mono màu link, có gạch chân
      for (const code of document.querySelectorAll<HTMLElement>('[data-shot="voting"] code'))
        if (code.textContent?.startsWith('@')) Object.assign(code.style, { color: '#4d96ee', textDecoration: 'underline' })
      if (theme === 'light') {
        recolor(document.getElementById('root')!)
        await tintEmoji(document.querySelector('[data-shot="tempvoice"]')!).catch((error) => console.warn('tintEmoji', error))
      }
      // vị trí lẻ pixel làm ảnh chụp dính một hàng nền trang ở mép, nên nền trang lấy đúng màu nền tin nhắn
      document.body.style.background = getComputedStyle(document.querySelector('[data-shot] > div')!).backgroundColor
      ;(window as any).__ready = true
    }
    setTimeout(done, 400)
  }, [])
  return (
    <MentionProvider roles={ROLES as never} users={USERS}>
      <div style={{ display: 'grid', gap: 24, padding: 24, justifyContent: 'start' }}>
        <Shot id="ticket">
          <EmbedPreview embed={ticketPanel} />
          <OpenSelect placeholder="Chọn thể loại ticket" options={TICKET_OPTIONS} />
        </Shot>
        <FormModal />
        <Shot id="ticket-open">
          <Markdown text={'Cảm ơn <@1> đã mở ticket! <@&12> sẽ hỗ trợ bạn sớm nhất có thể 🎟️✨'} />
          <EmbedPreview embed={ticketOpen} />
          <EmbedPreview embed={ticketForm} />
          <LayoutPreview components={[buttons({ label: 'Nhận ticket', emoji: '🙋' }, { label: 'Đóng ticket', emoji: '🔒', style: 4 }, { label: 'Đóng với lí do', emoji: '🔒', style: 4 })]} />
        </Shot>
        <Shot id="autoresponder" trigger={{ text: 'xoa me bot di' }} reply="mention">
          <Markdown text={AUTORESPONDER} />
        </Shot>
        <Shot id="welcome" trigger={{ text: 'hello ae' }} reply="mention">
          <LayoutPreview components={welcome} />
        </Shot>
        <Shot id="giveaway">
          <Markdown text="🎉🎉 **GIVEAWAY MỚI** 🎉🎉" />
          <EmbedPreview embed={giveaway} />
          <LayoutPreview components={[buttons({ label: 'Tham gia Giveaway!', emoji: '🎉', style: 3 }, { label: 'Người tham gia', emoji: '👥' })]} />
        </Shot>
        <Shot id="voting">
          <EmbedPreview embed={voting} />
          <LayoutPreview components={[buttons({ label: 'Trước', emoji: '⬅️', style: 1 }, { label: 'Sau', emoji: '➡️', style: 1 }, { label: 'Dừng', emoji: '⛔', style: 4 })]} />
        </Shot>
        <section data-shot="donation" style={{ width: 600 }}>
          <div className="grid gap-[17px] bg-[#222327] py-3 font-discord text-[#efeff1]">
            <Row avatar={wowieAvatar} name="wowie">
              <Markdown text="ogive <@1> 69420" />
            </Row>
            <Row avatar={uwuAvatar} name="UwU" bot reactions={['✅']}>
              <Markdown text="💳 **|** <@3> sent **69,420 cowoncy** to <@1>!" />
            </Row>
            <Row avatar={botAvatar} name={BRAND.name} bot>
              <Markdown text="<@3> đã ủng hộ cho **BucketDevelopment** bằng <:OwO:1155867563612446841> __Tiền OwOBot__ và nhận được **69,420** điểm ủng hộ!" />
            </Row>
          </div>
        </section>
        <section data-shot="wordconnect" style={{ width: 600 }}>
          <div className="grid gap-[10px] bg-[#222327] py-3 font-discord text-[#efeff1]">
            {CHAIN.map(([player, word, streak]) => (
              <Fragment key={word}>
                <Row avatar={PLAYERS[player].avatar} name={PLAYERS[player].name} reactions={streakReactions(streak)} reacted>
                  {word}
                </Row>
                {streak === MILESTONE && (
                  <Row avatar={botAvatar} name={BRAND.name} bot>
                    <Markdown text={`🔥✨ Đã cán streak **${MILESTONE.toLocaleString('en-US')}** lượt nối! Tiếp tục cố gắng tới **${(MILESTONE + 50).toLocaleString('en-US')}** nào ✨🔥`} />
                  </Row>
                )}
              </Fragment>
            ))}
          </div>
        </section>
        <section data-shot="psize" style={{ width: 600 }}>
          <div className="grid gap-[17px] bg-[#222327] py-3 font-discord text-[#efeff1]">
            <div>
              <Row {...FUN.modun} reactions={['❓']}>may thế</Row>
              <Follow>bot vẫn khá đúng</Follow>
            </div>
            <Row {...FUN.tudubucket}>
              <Markdown text="gpsize <@1531516242974736456>" />
            </Row>
            <BotEmbed embed={psize} />
          </div>
        </section>
        <section data-shot="gayrate" style={{ width: 600 }}>
          <div className="grid gap-[17px] bg-[#222327] py-3 font-discord text-[#efeff1]">
            <Row {...FUN.acurse}>
              <Markdown text="ggayrate <@669044659426820106>" />
            </Row>
            <BotEmbed embed={gayrate} />
          </div>
        </section>
        <section data-shot="kiss" style={{ width: 600 }}>
          <div className="grid gap-[17px] bg-[#222327] py-3 font-discord text-[#efeff1]">
            <Row {...FUN.skel} replyTo={{ ...FUN.kev, text: 'gslap' }}>gkiss</Row>
            <BotEmbed embed={kiss} />
          </div>
        </section>
        <section data-shot="quote" style={{ width: 600 }}>
          <div className="grid gap-[17px] bg-[#222327] py-3 font-discord text-[#efeff1]">
            <Row {...FUN.zackwo}>
              <Markdown text={QUOTE} />
            </Row>
            <Row avatar={botAvatar} name={BRAND.name} bot used={{ by: FUN.tudubucket, command: 'Quote Message', target: FUN.zackwo, text: QUOTE }}>
              <img src={quoteImage} alt="" className="mt-0.5 block w-full rounded-[8px]" />
            </Row>
          </div>
        </section>
        <Shot id="tempvoice">
          <LayoutPreview components={tempvoice} />
        </Shot>
        {SHOWCASE.map((n, i) => {
          const entry = gallery.find((item) => item.n === n)
          return entry ? (
            <Shot key={n} id={`layout-${i + 1}`} maxHeight={900}>
              <LayoutPreview components={trim(entry.components)} />
            </Shot>
          ) : null
        })}
        <Shot id="customrole">
          <EmbedPreview embed={customrole} />
        </Shot>
      </div>
    </MentionProvider>
  )
}

type Token = { light: string; ash: string }
type Rgba = [number, number, number, number]
const GROUPS: Record<string, RegExp> = {
  text: /^(text-|icon-|interactive-|channels-|channel-|chat-text|mention-foreground|control-.*-(text|icon)|reaction-text|header-)/,
  bg: /^(background-|chat-background|embed-background|control-.*-background|mention-background|reaction-background|card-|message-)/,
  border: /^(border-|spine-|reaction-border|control-.*-border|embed-)/,
}
// thứ tự ưu tiên khi nhiều token Discord có cùng màu ở theme ash
const PRIORITY = [
  'chat-background-default',
  'input-background-default',
  'background-base-lowest',
  'text-strong',
  'text-default',
  'text-muted',
  'text-link',
  'mention-foreground',
  'mention-background',
  'control-primary-text-default',
  'control-primary-background-default',
  'background-mod-subtle',
  'background-mod-normal',
  'border-subtle',
  'border-normal',
  'spine-default',
  'text-code',
  'background-code',
]
const ctx = document.createElement('canvas').getContext('2d')!

function parse(value: string): Rgba | null {
  if (!value || value === 'transparent' || value === 'none') return null
  ctx.fillStyle = '#000'
  ctx.fillStyle = value
  const out = ctx.fillStyle
  if (out.startsWith('#')) return [parseInt(out.slice(1, 3), 16), parseInt(out.slice(3, 5), 16), parseInt(out.slice(5, 7), 16), 1]
  const m = /rgba?\(([^)]+)\)/.exec(out)
  if (!m) return null
  const [r, g, b, a = '1'] = m[1].split(',').map((s) => s.trim())
  return [Number(r), Number(g), Number(b), Number(a)]
}

const hexRgba = (hex: string): Rgba => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
  hex.length > 7 ? parseInt(hex.slice(7, 9), 16) / 255 : 1,
]

const TOKENS = Object.entries((palette as { semantic: Record<string, Token> }).semantic)
  .filter(([, t]) => t.ash && t.light)
  .map(([name, t]) => ({ name, ash: hexRgba(t.ash), light: hexRgba(t.light), rank: PRIORITY.indexOf(name) }))

// màu gần nhất trong bảng màu Discord (theme ash, giống preview của dashboard) rồi lấy màu cùng token ở theme light
function nearest(color: Rgba, group: string): Rgba | null {
  if (color[3] === 0) return null
  let best: (typeof TOKENS)[number] | null = null
  let bestScore = Infinity
  for (const token of TOKENS) {
    if (!GROUPS[group].test(token.name)) continue
    const [r, g, b, a] = token.ash
    const score =
      Math.hypot(r - color[0], g - color[1], b - color[2]) + Math.abs(a - color[3]) * 40 + (token.rank < 0 ? 0.5 : token.rank * 0.01)
    if (score < bestScore) {
      bestScore = score
      best = token
    }
  }
  if (!best || bestScore > 16) return null
  const alpha = best.ash[3] > 0 ? Math.min(1, (color[3] * best.light[3]) / best.ash[3]) : color[3]
  return [best.light[0], best.light[1], best.light[2], alpha]
}

const PROPS: [string, string][] = [
  ['color', 'text'],
  ['background-color', 'bg'],
  ['border-top-color', 'border'],
  ['border-right-color', 'border'],
  ['border-bottom-color', 'border'],
  ['border-left-color', 'border'],
  ['fill', 'text'],
  ['text-decoration-color', 'text'],
]

function recolor(root: HTMLElement) {
  const plan: [HTMLElement, string, string][] = []
  for (const el of [root, ...root.querySelectorAll<HTMLElement>('*')]) {
    const style = getComputedStyle(el)
    for (const [prop, group] of PROPS) {
      const color = parse(style.getPropertyValue(prop))
      const mapped = color && nearest(color, group)
      if (mapped) plan.push([el, prop, `rgba(${mapped[0]}, ${mapped[1]}, ${mapped[2]}, ${mapped[3].toFixed(3)})`])
    }
  }
  for (const [el, prop, value] of plan) el.style.setProperty(prop, value, 'important')
}

// emoji app của bot là icon trắng, sang theme light gần như mất trên nút xám nhạt nên phần trắng lấy màu icon nút của theme light,
// nét trắng nằm gọn trong huy hiệu màu (dấu +, mũi tên, ổ khóa...) thì giữ nguyên
async function tintEmoji(root: Element) {
  const [tr, tg, tb] = hexRgba((palette as { semantic: Record<string, Token> }).semantic['control-secondary-icon-default'].light)
  await Promise.all(
    [...root.querySelectorAll<HTMLImageElement>('img[src*="/emojis/"]')].map(async (img) => {
      const source = new Image()
      source.crossOrigin = 'anonymous'
      source.src = img.src.replace(/size=\d+/, 'size=96')
      await source.decode()
      const { naturalWidth: w, naturalHeight: h } = source
      const canvas = Object.assign(document.createElement('canvas'), { width: w, height: h })
      const c = canvas.getContext('2d')!
      c.drawImage(source, 0, 0)
      const px = c.getImageData(0, 0, w, h).data
      const white = (i: number) => px[i + 3] > 128 && Math.min(px[i], px[i + 1], px[i + 2]) > 200
      const enclosed = (x: number, y: number) => {
        let hits = 0
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          for (let s = 1, nx = x + dx, ny = y + dy; s <= w / 3 && nx >= 0 && ny >= 0 && nx < w && ny < h; s++, nx += dx, ny += dy) {
            const j = (ny * w + nx) * 4
            if (white(j)) continue
            if (px[j + 3] > 128) hits++
            break
          }
        }
        return hits >= 3
      }
      const out = new Uint8ClampedArray(px)
      for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4
          if (!px[i + 3] || Math.min(px[i], px[i + 1], px[i + 2]) <= 200 || enclosed(x, y)) continue
          out.set([tr, tg, tb], i)
        }
      c.putImageData(new ImageData(out, w, h), 0, 0)
      img.src = canvas.toDataURL()
      await img.decode()
    }),
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Shots />
  </StrictMode>,
)
