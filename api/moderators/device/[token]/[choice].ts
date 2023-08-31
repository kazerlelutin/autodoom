import prisma from '../../../../src/lib/prisma'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function moderator_device_choice(
  request: VercelRequest,
  response: VercelResponse
) {
  const { token, choice } = request.query

  if (!token || !choice)
    return response.status(400).json({ error: 'no-token-input' })
  // check si le token est valide
  // si ok, ajouter le choix dans la requete, puis effacer le token
  // on ajoute au log.

  // si tous les request sont traités, on valide ou non la machine, pas de suppression de la modo, sinon, on ne sait pas si la machine à été traité.

  return response.status(200).json({
    message: 'rediriger ou un simple message',
  })
}
