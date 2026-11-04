export function onRequest({ request, env }) {
  const url = new URL(request.url)
  url.pathname = '/dashboard/'
  url.search = ''
  return env.ASSETS.fetch(new Request(url, request))
}
