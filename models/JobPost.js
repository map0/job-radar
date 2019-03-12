const mongoose = require('mongoose')
const slug = require('slugs')

mongoose.Promise = global.Promise

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'The job Title is a required filed'
  },
  company: {
    type: String,
    trim: true,
    required: 'A company is required'
  },
  tags: [String],
  slug: String,
  description: {
    type: String,
    trim: true
  }
})

jobSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    return next()
  }
  this.slug = `${slug(this.company)}/${slug(this.title)}`
  next()
})

module.exports = mongoose.model('JobPost', jobSchema)
