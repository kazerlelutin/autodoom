import { Device, Moderator } from '@prisma/client'

export function layoutDeviceModo(
  devicesAndToken: {
    device: Device
    token: string
  }[],
  moderator: Moderator,
  originUrl: string
) {
  const texts = {
    fr: {
      title: 'Demande de modération',
      description: `Bonjour ${moderator.name}, vous avez des demandes de modération en attente`,
      device: 'Machine',
      approve: 'Approuver',
      reject: 'Rejeter',
    },
    en: {
      title: 'Device Approval',
      description: `Hello ${moderator.name}, you have moderation requests pending`,
      device: 'Device',
      approve: 'Approve',
      reject: 'Reject',
    },
  }[moderator.lang]

  // TODO faire les liens

  const baseUrl = `${originUrl}/api/moderation/device/`

  const devicePart = devicesAndToken.map((deviceAndToken) => {
    return `<tr>
    <td style="background-color: #262020; padding: 10px; border-radius: 5px;">
      <p style="margin: 0; padding: 0;font-size: 25px">${texts.device}: <span style="font-weight:bold;text-transform:uppercase">${deviceAndToken.device.name}</span></p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0;">
            <a href="${baseUrl}${deviceAndToken.token}/approve" style="display: inline-block; background-color: #67df5f; color: #FFFFFF; padding: 5px 10px; border-radius: 5px; text-decoration: none;">${texts.approve}</a>
          </td>
          <td style="padding: 10px 0;">
            <a href="${baseUrl}${deviceAndToken.token}/reject" style="display: inline-block; background-color: #a70000; color: #FFFFFF; padding: 5px 10px; border-radius: 5px; text-decoration: none;">${texts.reject}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>`
  })

  return `<body style="font-family: Arial, sans-serif; background-color: #000000; color: #FFFFFF; margin: 0; padding: 0;">
  <table cellpadding="2" cellspacing="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #1A1A1A; border-radius: 10px;">
    <tr>
      <td style="padding: 20px;">
        <h2 style="margin: 0; padding: 0;color: red">AUT0D00M | ${
          texts.title
        }</h2>
        <p style="margin: 10px 0 20px 0;color:red">${texts.description}</p>
        <!-- Device list -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
        ${devicePart.join('')}
        </table>
      </td>
    </tr>
  </table>
</body>`
}
