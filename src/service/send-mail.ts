import { Resend } from 'resend'

export async function sendMailToModerator(to: string, html: string) {
  const resend = new Resend(process.env.RESEND)
  await resend.emails.send({
    from: 'AUT0D00M<modo@noscreenwithoutdoom.art>',
    to,
    subject: 'Moderation request',
    html,
  })
}
