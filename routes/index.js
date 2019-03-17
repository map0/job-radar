const express = require('express')
const jobPostControllers = require('../controllers/jobPostController')
const userControllers = require('../controllers/userController')
const authController = require('../controllers/authController')
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

router.get('/tags', catchErrors(jobPostControllers.getjobPostByTag));
router.get('/tags/:tag', catchErrors(jobPostControllers.getjobPostByTag));

router.get('/login', userControllers.loginForm)
router.post('/login', authController.login)

router.get('/register', userControllers.registerForm)
router.post('/register',
  userControllers.validateRegister,
  catchErrors(userControllers.register),
  authController.login)

module.exports = router
