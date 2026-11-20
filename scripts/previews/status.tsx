import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './preview.css'
import { DiscordMessage, LayoutPreview } from '@/components/discord-preview'
import type { LayoutComponent } from '@/lib/contracts'
import { statusEmbed } from '../../../GlitchBucket-Dashboard/backend/src/status-embed.ts'
import tudubucketAvatar from './tudubucket.webp'

// component embed khi dán link /status vào Discord, dựng từ statusEmbed của backend với số liệu mẫu
const shards = (c: number, f: (i: number) => number | null) => Array.from({ length: 15 }, (_, i) => ({ id: c * 15 + i, latency_ms: f(i) }))
const up = (id: number, uptime: number, servers: number, members: number, memory: number, f = (i: number): number | null => 40 + i) =>
  ({ id, online: true, uptime_seconds: uptime, servers, members, memory_bytes: memory, shards: shards(id, f) })
const down = (id: number) => ({ id, online: false, uptime_seconds: null, servers: null, members: null, memory_bytes: null, shards: shards(id, () => null) })
const CASES = [
  { name: 'Ổn định', lang: 'vi', clusters: [up(0, 7800, 10602, 2719532, 1040187392), up(1, 263000, 10689, 2629654, 1121987392)] },
  { name: 'Đang khởi động', lang: 'vi', clusters: [up(0, 140, 10602, 2719532, 612000000, (i) => (i > 9 ? null : 40 + i)), up(1, 95, 4100, 1029654, 402000000, (i) => (i > 4 ? null : 50 + i))] },
  { name: 'Có sự cố', lang: 'vi', clusters: [down(0), up(1, 263000, 10689, 2629654, 1121987392)] },
  { name: 'Ngoại tuyến', lang: 'vi', clusters: [down(0), down(1)] },
  { name: 'English', lang: 'en', clusters: [up(0, 7800, 10602, 2719532, 1040187392), up(1, 263000, 10689, 2629654, 1121987392)] },
] as const

function Gallery() {
  const now = Math.trunc(Date.now() / 1000) - 20
  return (
    <main className="mx-auto max-w-[1400px] p-6 font-discord text-[#efeff1]">
      <h1 className="text-2xl font-bold">Embed của trang /status</h1>
      <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,520px),1fr))] items-start gap-6">
        {CASES.map((c) => {
          const embed = statusEmbed({ status: 'online', servers: 21291, users: 5349186, http_latency_ms: 50, updated_at: now, clusters: [...c.clusters] }, c.lang)
          const url = c.lang === 'vi' ? 'https://bot.tudubucket.dev/status' : 'https://bot.tudubucket.dev/en/status'
          return (
            <article key={c.name} className="overflow-hidden rounded-lg border border-[#94949c]/12 bg-[#222327]">
              <header className="border-b border-[#94949c]/12 px-4 py-3 font-semibold">{c.name}</header>
              <DiscordMessage bare className="rounded-none border-0 shadow-none" botName="tudubucket" botAvatar={tudubucketAvatar}>
                <p className="text-[#00a8fc]">{url}</p>
                <LayoutPreview components={[embed.component as unknown as LayoutComponent]} />
              </DiscordMessage>
            </article>
          )
        })}
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Gallery />
  </StrictMode>,
)
