const nodemailer = require('nodemailer')
const promisify = require('es6-promisify')
// const pug = require('pug')
// const juice = require('juice')
// const htmlToText = require('html-to-text')

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

// transport.sendMail({
//   from: 'Mihail Petrov <noreply@map.com>',
//   to: 'foo@bar.com',
//   subject: 'Just trying thing out',
//   html: 'Hey I <string>love</string> you!!@@@@',
//   text: 'Hey I really do **love** ya'
// })


exports.send = async (options) => {
  const mailOptions = {
    from: 'Job Radar Service <noreply@jobradar.com>',
    to: options.user.email,
    subject: options.subject,
    html: 'to be filled in later',
    text: 'as well to be filled in later'
  }
  return transport.sendMail(mailOptions)
}
