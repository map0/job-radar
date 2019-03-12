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
