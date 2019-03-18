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
  req.body.author = req.user._id
  const jobPost = await (new JobPostModel(req.body)).save()
  req.flash('success', `Successfully created a job post for ${jobPost.title}. Goog luck!`)
  res.redirect(`/jobPost/${jobPost.slug}`)
}

const confirmOwner = (jobPost, user) => {
  if (!jobPost.author.equals(user._id)) {
    throw Error('You must own a store in order to edit it!')
  }
}

exports.editJobPost = async (req, res) => {
  const jobPost = await JobPostModel.findOne({ _id: req.params.id })
  confirmOwner(jobPost, req.user)
  res.render('editJobPost', { title: 'Edit Job Post', jobPost })
}

exports.updateJobPost = async (req, res) => {
  // set the location data to be a Point
  req.body.location.type = 'Point'
  const jobPost = await JobPostModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, ruValidators: true})
  confirmOwner(jobPost, req.user)
  req.flash('success', `Succesfully updated <strong>${jobPost.title}</strong>`)
  res.redirect(`/jobPosts/${jobPost.id}/edit`)
}

exports.getJobPostBySlug = async (req, res) => {
  const jobPost = await JobPostModel.findOne({ slug: req.params.slug })
  if (!jobPost) return next()
  res.render('jobPost', { jobPost, title: jobPost.title})
}

exports.getjobPostByTag = async (req, res) => {
  const tag = req.params.tag;
  const tagQuery = tag || { $exists: true, $ne: [] }
  const tagsPromise = JobPostModel.getTagsList()
  const jobPostsPromise = JobPostModel.find({ tags: tagQuery })
  const [tags, jobPosts] = await Promise.all([tagsPromise, jobPostsPromise])

  res.render('tag', { tags, title: 'Tags', tag, jobPosts })
}

exports.searchJobPosts = async (req, res) => {
  // res.json(req.query)
  const jobPosts = await JobPostModel
  // first find stores that match
  .find({
    $text: {
      $search: req.query.q
    }
  }, {
    score: { $meta: 'textScore' }
  })
  // the sort them
  .sort({
    score: { $meta: 'textScore' }
  })
  // limit to only 5 results
  .limit(5)
  res.json(jobPosts)
}
