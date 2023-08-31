import prisma from '../../../src/lib/prisma'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function moderator_delete(
  request: VercelRequest,
  response: VercelResponse
) {
  const token = request.headers.authorization

  if (!token) return response.status(400).json({ error: 'no-token-input' })

  if (token.replace('Bearer ', '') !== process.env.ADMIN_TOKEN)
    return response.status(400).json({ error: 'invalid-token' })

  // Batch delete
  const deleteModerator = prisma.moderator.delete({
    where: {
      id: request.query.id as string,
    },
  })

  const moderationRequests = prisma.moderationRequest.deleteMany({
    where: {
      moderatorId: request.query.id as string,
    },
  })

  const actionLogs = prisma.actionLog.deleteMany({
    where: {
      moderatorId: request.query.id as string,
    },
  })

  await prisma.$transaction([actionLogs, moderationRequests, deleteModerator])

  return response.status(200).json({
    message: 'Moderator deleted',
  })
}
