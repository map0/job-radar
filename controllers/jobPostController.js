const mongoose = require('mongoose')
const JobPostModel = mongoose.model('JobPost')
const multer = require('multer')
const uuid = require('uuid')
const jimp = require('jimp')

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/')
    if(isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false)
    }
  }
}

exports.upload = multer(multerOptions).single('photo')

exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next() // skip to the next middleware
    return
  }
  const extension = req.file.mimetype.split('/')[1]
  req.body.photo = `${uuid.v4()}.${extension}`
  // now we resize
  const photo = await jimp.read(req.file.buffer)
  await photo.resize(200, 200)
  await photo.write(`./public/uploads/${req.body.photo}`)
  // once we have written the photo to our filesystem, keep going!
  next();
}

exports.getJobPosts = async (req, res) => {
  const jobPosts = await JobPostModel.find()
  res.render('jobPosts', { title: 'Job Posts', jobPosts })
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
  res.render('editJobPost', { title: 'Edit Job Post', jobPost })
}

exports.updateJobPost = async (req, res) => {
  // set the location data to be a Point
  req.body.location.type = 'Point'
  const jobPost = await JobPostModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, ruValidators: true})

  req.flash('success', `Succesfully updated <strong>${jobPost.title}</strong>`)
  res.redirect(`/jobPosts/${jobPost.id}/edit`)
}

exports.getJobPostBySlug = async (req, res) => {
  const jobPost = await JobPostModel.findOne({ slug: req.params.slug })
  if (!jobPost) return next()
  res.render('jobPost', { jobPost, title: jobPost.title})
}

exports.getjobPostByTag = async (req, res) => {
  const tags = await JobPostModel.getTagsList();
  const tag = req.params.tag;
  res.render('tag', { tags, title: 'Tags', tag });
}
