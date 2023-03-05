import nodemailer from 'nodemailer'

class MailSender {
  constructor () {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  sendEmail (targetEmail, playlistId, playlistName, content) {
    const message = {
      from: 'openMusicApp@mail.com',
      to: targetEmail,
      subject: `Ekspor lagu playlist - ${playlistName}`,
      text: `Berikut hasil ekspor lagu pada playlist ${playlistName}`,
      attachments: [
        {
          filename: `${playlistId}.json`,
          content
        }
      ]
    }

    return this._transporter.sendMail(message)
  }
}

export default MailSender
