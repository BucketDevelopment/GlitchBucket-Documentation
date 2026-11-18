import { fileURLToPath, pathToFileURL } from 'node:url'

const here = (path) => fileURLToPath(new URL(path, import.meta.url)).replaceAll('\\', '/')
export const DASHBOARD = process.env.DASHBOARD_DIR?.replaceAll('\\', '/') ?? here('../../../GlitchBucket-Dashboard/frontend')
const load = async (path) => (await import(pathToFileURL(`${DASHBOARD}/node_modules/${path}`).href)).default

export default {
  root: here('.'),
  base: '/dashboard/',
  publicDir: `${DASHBOARD}/public`,
  plugins: [(await load('@vitejs/plugin-react/dist/index.js'))(), (await load('@tailwindcss/vite/dist/index.mjs'))()],
  resolve: {
    alias: [
      { find: /^@\/lib\/auth\/context$/, replacement: here('./stubs/auth.ts') },
      { find: /^@\/lib\/discord$/, replacement: here('./stubs/discord.ts') },
      { find: '@dashboard', replacement: DASHBOARD },
      { find: '@', replacement: `${DASHBOARD}/src` },
      { find: 'react', replacement: `${DASHBOARD}/node_modules/react` },
      { find: 'react-dom', replacement: `${DASHBOARD}/node_modules/react-dom` },
    ],
  },
  define: {
    __BUILD_ID__: '"preview"',
    __DEV__: 'true',
    __API_BASE_URL__: '"http://127.0.0.1:9"',
    __CLIENT_TOKENS__: '[]',
    __WS_CLIENT_TOKENS__: '[]',
    __DISCORD_CLIENT_ID__: '"0"',
    __SUPPORT_URL__: '"#"',
    __DOCS_URL__: '"#"',
    __PREMIUM_URL__: '"#"',
    __TURNSTILE_SITEKEY__: '""',
    __COMMIT_SHA__: '"preview"',
  },
  server: { port: 5191, strictPort: true, fs: { allow: [DASHBOARD, here('../..'), here('../../../GlitchBucket-Dashboard/docs')] } },
}
