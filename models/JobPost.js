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
  },
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates'
    }],
    address: {
      type: String,
      required: 'You must supply a physical address'
    }
  },
  photo: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
})

jobSchema.pre('save', function (next) {
  if (!this.isModified('title')) {
    return next()
  }
  this.slug = `${slug(this.company)}-${slug(this.title)}`
  next()
})

jobSchema.statics.getTagsList = function () {
  return this.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
}

module.exports = mongoose.model('JobPost', jobSchema)
