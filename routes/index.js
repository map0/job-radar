const express = require('express')
const jobPostControllers = require('../controllers/jobPostController')
const { catchErrors } = require('../handlers/errorHandlers')

const router = express.Router()

router.get('/', catchErrors(jobPostControllers.getJobPosts))

router.get('/jobPosts', catchErrors(jobPostControllers.getJobPosts))
router.get('/jobPost/:id/edit', catchErrors(jobPostControllers.editJobPost))

router.get('/add',
  jobPostControllers.upload,
  catchErrors(jobPostControllers.resize),
  catchErrors(jobPostControllers.addJobPost))
router.post('/add/:id',
  jobPostControllers.upload,
  catchErrors(jobPostControllers.resize),
  catchErrors(jobPostControllers.updateJobPost))
router.post('/add', catchErrors(jobPostControllers.createJobPost))

module.exports = router
