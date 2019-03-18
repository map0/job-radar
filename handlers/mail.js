const nodemailer = require('nodemailer')
const promisify = require('es6-promisify')
const pug = require('pug')
const htmlToText = require('html-to-text')
const juice = require('juice')

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

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options)
  const inlined = juice(html);
  return inlined
}

exports.send = async (options) => {
  const html = generateHTML(options.filename, options)
  const text = htmlToText.fromString(html)

  const mailOptions = {
    from: 'Job Radar Service <noreply@jobradar.com>',
    to: options.user.email,
    subject: options.subject,
    html,
    text
  }
  return transport.sendMail(mailOptions)
}
