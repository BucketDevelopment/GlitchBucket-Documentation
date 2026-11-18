export const PREVIEW_USER_ID = 'preview'

export function useAuth() {
  return { user: { id: PREVIEW_USER_ID, avatar: 'cat', username: 'tudubucket', display_name: 'tudubucket' } }
}
