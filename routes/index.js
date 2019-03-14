const express = require('express')
const jobPostControllers = require('../controllers/jobPostController')
const { catchErrors } = require('../handlers/errorHandlers')

const router = express.Router()

router.get('/', catchErrors(jobPostControllers.getJobPosts))

router.get('/jobPosts', catchErrors(jobPostControllers.getJobPosts))
router.get('/jobPosts/:id/edit', catchErrors(jobPostControllers.editJobPost))

router.get('/add', catchErrors(jobPostControllers.addJobPost))
router.post('/add',
  jobPostControllers.upload,
  catchErrors(jobPostControllers.resize),
  catchErrors(jobPostControllers.createJobPost))
router.post('/add/:id',
  jobPostControllers.upload,
  catchErrors(jobPostControllers.resize),
  catchErrors(jobPostControllers.updateJobPost))

router.get('/jobPost/:slug', catchErrors(jobPostControllers.getJobPostBySlug))


module.exports = router
