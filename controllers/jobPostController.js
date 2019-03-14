const mongoose = require('mongoose')
const JobPostModel = mongoose.model('JobPost')

exports.getJobPosts = async (req, res) => {
  const jobPosts = await JobPostModel.find()
  res.render('jobPosts', { title: 'Job Posts', jobPosts });
}

exports.addJobPost = (req, res) => {
  res.render('editJobPost', { title: 'Add a new Job' })
}

exports.createJobPost = async (req, res) => {
  const jobPost = await (new JobPostModel(req.body)).save()
  req.flash('success', `Successfully created a job post for ${jobPost.title}. Goog luck!`)
  res.redirect(`/jobPost/${jobPost.slug}`)
}

exports.editJobPost = async (req, res) => {
  const jobPost = await JobPostModel.findOne({ _id: req.params.id })
  res.render('editJobPost', { title: 'Edit Job Post', jobPost });
}

exports.updateJobPost = async (req, res) => {
  // set the location data to be a Point
  req.body.location.type = 'Point'
  const jobPost = await JobPostModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, ruValidators: true})

  req.flash('success', `Succesfully updated <strong>${jobPost.title}</strong>`)
  res.redirect(`/jobPost/${jobPost.id}/edit`)
}