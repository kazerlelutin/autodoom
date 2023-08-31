import prisma from '../../src/lib/prisma'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function moderator_create(
  request: VercelRequest,
  response: VercelResponse
) {
  const token = request.headers.authorization

  if (!token) return response.status(400).json({ error: 'no-token-input' })

  if (token.replace('Bearer ', '') !== process.env.ADMIN_TOKEN)
    return response.status(400).json({ error: 'invalid-token' })

  const form = request.body

  const exist = await prisma.moderator.count({
    where: {
      name: form.email,
    },
  })
  if (exist > 0)
    return response.status(400).json({ error: 'moderator-already-exist' })

  const moderator = await prisma.moderator.create({
    data: {
      name: form.name,
      email: form.email,
      lang: form.lang,
    },
  })

  return response.status(200).json(moderator)
}
