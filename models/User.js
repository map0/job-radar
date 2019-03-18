const mongoose = require('mongoose')
const validatorIsEmail = require('validator/lib/isEmail')
const mongodbErrorHandler = require('mongoose-beautiful-unique-validation')
const passportLocalMongoose = require('passport-local-mongoose')
const md5 = require('md5')

// const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: 'Two users cannot share the same username ({VALUE})',
    lowercase: true,
    trim: true,
    validate: [validatorIsEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  // hearts: [{
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Store'
  // }]
})

userSchema.virtual('gravatar').get(function () {
  const hash = md5(this.email)
  return `https://gravatar.com/avatar/${hash}?s=80`
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
userSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('User', userSchema)
