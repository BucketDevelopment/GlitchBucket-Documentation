import { userAvatar as discordAvatar } from '@dashboard/src/lib/discord.ts'
import cat from '../tudubucket.webp'
import { PREVIEW_USER_ID } from './auth'

export * from '@dashboard/src/lib/discord.ts'

export function userAvatar(user: { id: string; avatar: string | null }, size = 64) {
  return user.id === PREVIEW_USER_ID ? cat : discordAvatar(user, size)
}
