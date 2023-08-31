import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from '../../src/lib/prisma'
import { v5 as uuidv5 } from 'uuid'
import { sendMailToModerator } from '../../src/service/send-mail'
import { layoutDeviceModo } from '../../src/layouts/email/device-modo'

/**
 *
 * @param name week
 * @param description Se joue toutes les semaines. doit envoyer un message au modo pour les machines en attente de validation. Doit faire ses recherches pour les machines validées.
 */
export default async function week(
  _req: VercelRequest,
  response: VercelResponse
) {
  // Check if cron already played ----------------------------------------------
  const checkLog = await prisma.cronLog.findFirst({
    where: {
      name: 'week',
      timestamp: {
        gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  })

  if (checkLog && process.env.NODE_ENV !== 'development') {
    return response
      .status(200)
      .json({ success: false, message: 'already-played' })
  }

  // Batch DB request ----------------------------------------------------------
  const _moderators = prisma.moderator.findMany()

  const _moderationWithoutRequests = prisma.moderation.findMany({
    where: {
      // sur que ce ne soit pas une demande de validation déjà acceptée ou refusée
      rejectedCount: 0,
      acceptedCount: 0,
      NOT: {
        moderationRequests: {
          some: {},
        },
      },
    },
    take: 5,
  })

  const delOldLogs = prisma.cronLog.deleteMany({
    where: {
      name: 'week',
      timestamp: {
        lt: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  })

  const createLog = prisma.cronLog.create({
    data: {
      name: 'week',
    },
  })

  // Batch DB request ----------------------------------------------------------

  const transactions = await prisma.$transaction([
    _moderators,
    _moderationWithoutRequests,
    delOldLogs,
    createLog,
  ])

  const [moderators, moderationWithoutRequests] = transactions

  // Create token and send mail ------------------------------------------------
  const _moderationRequests = prisma.moderationRequest.createMany({
    data: moderationWithoutRequests.reduce((acc, cur) => {
      return [
        ...acc,
        ...moderators.map((moderator) => ({
          token: uuidv5(moderator.email, cur.id),
          moderatorId: moderator.id,
          moderationId: cur.id,
        })),
      ]
    }, []),
  })

  const _requests = prisma.moderationRequest.findMany({
    where: {
      moderationId: {
        in: moderationWithoutRequests.map((moderation) => moderation.id),
      },
    },
    include: {
      moderation: {
        include: {
          device: true,
        },
      },
    },
  })

  const [, requests] = await prisma.$transaction([
    _moderationRequests,
    _requests,
  ])

  // delete existing devices
  const devicesAndToken = requests.reduce((acc, cur) => {
    const isExist = acc.find(
      (item) => item.device.id === cur.moderation.device.id
    )

    if (isExist) return acc

    return [
      ...acc,
      {
        device: cur.moderation.device,
        token: cur.token,
      },
    ]
  }, [])

  for (const moderator of moderators) {
    const html = layoutDeviceModo(
      devicesAndToken,
      moderator,
      process.env.BASE_URL
    )
    await sendMailToModerator(moderator.email, html)
  }

  response.status(200).json({ success: true, devicesAndToken })
}
