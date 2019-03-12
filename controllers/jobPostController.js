const mongoose = require('mongoose')
const JobPostModel = mongoose.model('JobPost')

exports.home = (req, res) => {
  res.render('layout')
}

exports.addJobPost = (req, res) => {
  res.render('editJobPost', { title: 'Add a new Job' })
}

exports.createJobPost = async (req, res) => {
  const jobPost = new JobPostModel(req.body)
  await jobPost.save()
  res.redirect('/')
}
