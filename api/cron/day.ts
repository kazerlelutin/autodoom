import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from '../../src/lib/prisma'
import { sendMailToModerator } from '../../src/service/send-mail'

/**
 *
 * @param description Se joue tous les jours. doit envoyer un message au modo pour les machines en attente de validation. Doit faire ses recherches pour les machines validées.
 */
export default async function day(
  request: VercelRequest,
  response: VercelResponse
) {
  const devices = await prisma.device.findMany({
    where: { isActive: false },
    take: 5,
  })
  console.log('Cron job running')
  console.log("Je vérifie avant que j'ai pas été joué trop tot")
  console.log('Je prend une liste de machine, genre 5 max à envoyé au modo')
  console.log(
    'Je met à jour le count des reminder pour les modo, mais je gère dans une autre tache les '
  )
  const html = `<body style="font-family: Arial, sans-serif; background-color: #000000; color: #FFFFFF; margin: 0; padding: 0;">
  <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #1A1A1A; border-radius: 10px;">
    <tr>
      <td style="padding: 20px;">
        <h2 style="margin: 0; padding: 0;">Device Approval</h2>
        <p style="margin: 10px 0 20px 0;">Review the list of devices and choose whether to approve or reject them:</p>
        <!-- Device list -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
          <tr>
            <td style="background-color: #808080; padding: 10px; border-radius: 5px;">
              <p style="margin: 0; padding: 0;">Device: atm</p>
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0;">
                    <a href="#" style="display: inline-block; background-color: #67df5f; color: #FFFFFF; padding: 5px 10px; border-radius: 5px; text-decoration: none;">Approve</a>
                  </td>
                  <td style="padding: 10px 0;">
                    <a href="#" style="display: inline-block; background-color: #a70000; color: #FFFFFF; padding: 5px 10px; border-radius: 5px; text-decoration: none;">Reject</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Repeat the above structure for each device -->
        </table>
      </td>
    </tr>
  </table>
</body>`

  // await sendMailToModerator('email', html)

  response.status(200).json({ success: true, devices })
}
