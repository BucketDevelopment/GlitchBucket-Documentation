import { Component, StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './preview.css'
import { DiscordMessage, LayoutPreview } from '@/components/discord-preview'
import type { LayoutComponent } from '@/lib/contracts'
import { BRAND } from '../../web/data/brand.mjs'
import layouts from './layouts.local.json'

type Entry = { n: number; guild: string; server: string | null; name: string; components: LayoutComponent[] }

const brandFiles = import.meta.glob('../../public/brand/*', { eager: true, query: '?url', import: 'default' })
const botAvatar = brandFiles[`../../public${BRAND.avatar}`] as string
const entries = layouts as unknown as Entry[]

// một layout hỏng không được làm trắng cả trang
class Guard extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? <p className="p-4 text-sm text-[#f87e7a]">Layout này không dựng được.</p> : this.props.children
  }
}

function Card({ entry }: { entry: Entry }) {
  return (
    <article
      id={`layout-${entry.n}`}
      className="overflow-hidden rounded-lg border border-[#94949c]/12 bg-[#222327]"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 560px' }}
    >
      <header className="flex items-baseline gap-3 border-b border-[#94949c]/12 px-4 py-3 font-discord">
        <span className="text-2xl font-bold text-[#c0cdff]">#{entry.n}</span>
        <span className="min-w-0 flex-1 truncate text-[#fbfbfb]">
          <b className="font-semibold">{entry.server ?? `Server ${entry.guild}`}</b>
          <span className="text-[#96979e]"> · {entry.name}</span>
        </span>
        {!entry.server && <span className="shrink-0 text-xs text-[#96979e]">bot đã rời server</span>}
      </header>
      <Guard>
        <DiscordMessage bare className="rounded-none border-0 shadow-none" botName={BRAND.name} botAvatar={botAvatar}>
          <LayoutPreview components={entry.components} />
        </DiscordMessage>
      </Guard>
    </article>
  )
}

function Gallery() {
  const servers = new Set(entries.map((entry) => entry.guild)).size
  return (
    <main className="mx-auto max-w-[1800px] p-6 font-discord text-[#efeff1]">
      <h1 className="text-2xl font-bold">{entries.length} layout của {servers} server</h1>
      <p className="mt-2 max-w-[80ch] text-sm text-[#abacb2]">
        Xếp từ layout nhiều chất liệu (ảnh, container có màu, section, nút) tới layout đơn giản. Link ảnh Discord đã được làm mới,
        còn hạn khoảng 24 giờ.
      </p>
      <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,560px),1fr))] items-start gap-6">
        {entries.map((entry) => (
          <Card key={entry.n} entry={entry} />
        ))}
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Gallery />
  </StrictMode>,
)
