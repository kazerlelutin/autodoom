import prisma from '../../src/lib/prisma'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function moderator(
  request: VercelRequest,
  response: VercelResponse
) {
  const token = request.headers.authorization

  if (!token) return response.status(400).json({ error: 'no-token-input' })

  if (token.replace('Bearer ', '') !== process.env.ADMIN_TOKEN)
    return response.status(400).json({ error: 'invalid-token' })
  const moderators = await prisma.moderator.findMany()
  return response.status(200).json(moderators)
}
