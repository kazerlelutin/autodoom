import prisma from '../../src/lib/prisma'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function proposal(
  request: VercelRequest,
  response: VercelResponse
) {
  const body = request.body

  if (!body?.device)
    return response.status(400).json({ error: 'no-device-input' })
  const { device } = body

  const deviceExists = await prisma.device.findUnique({
    where: { name: device },
  })

  if (deviceExists)
    return response.status(400).json({ error: 'device-already-exist' })

  try {
    await prisma.device.create({
      data: {
        name: device,
      },
    })

    return response.status(200).json({
      body: request.body,
      query: request.query,
      cookies: request.cookies,
    })
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
}
