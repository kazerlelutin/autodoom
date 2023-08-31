import { ipAddress } from '@vercel/edge'

export const config = {
  runtime: 'experimental-edge',
}

export default async function verify(request: Request) {
  const body = await request.json()
  if (!body?.token) return new Response('no token', { status: 400 })
  const { token } = body

  const TURNSTILE_SECRET =
    process.env.NODE_ENV !== 'production'
      ? '1x0000000000000000000000000000000AA'
      : process.env.TURNSTILE_SECRET
  const ip = ipAddress(request) || 'unknown'

  const formData = new FormData()

  formData.append('secret', TURNSTILE_SECRET)
  formData.append('response', token)
  formData.append('remoteip', ip)

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

  const result = await fetch(url, {
    body: formData,
    method: 'POST',
  })

  const outcome = await result.json()
  if (!outcome.success) return new Response('failed', { status: 400 })

  return new Response(
    JSON.stringify({
      message: 'your are a human 🤖',
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}
