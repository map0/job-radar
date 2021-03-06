const express = require('express')
const jobPostControllers = require('../controllers/jobPostController')
const userControllers = require('../controllers/userController')
const authController = require('../controllers/authController')
const { catchErrors } = require('../handlers/errorHandlers')

const router = express.Router()

router.get('/', catchErrors(jobPostControllers.getJobPosts))

router.get('/jobPosts', catchErrors(jobPostControllers.getJobPosts))
router.get('/jobPosts/:id/edit',
  authController.isLoggedIn,
  catchErrors(jobPostControllers.editJobPost))

router.get('/add',
  authController.isLoggedIn,
  jobPostControllers.addJobPost)
router.post('/add',
  authController.isLoggedIn,
  jobPostControllers.upload,
  catchErrors(jobPostControllers.resize),
  catchErrors(jobPostControllers.createJobPost))
router.post('/add/:id',
  authController.isLoggedIn,
  jobPostControllers.upload,
  catchErrors(jobPostControllers.resize),
  catchErrors(jobPostControllers.updateJobPost))

router.get('/jobPost/:slug', catchErrors(jobPostControllers.getJobPostBySlug))

router.get('/tags', catchErrors(jobPostControllers.getjobPostByTag));
router.get('/tags/:tag', catchErrors(jobPostControllers.getjobPostByTag));

router.get('/login', userControllers.loginForm)
router.post('/login', authController.login)

router.get('/logout', authController.logout);

router.get('/register', userControllers.registerForm)
router.post('/register',
  userControllers.validateRegister,
  catchErrors(userControllers.register),
  authController.login)

router.get('/account', authController.isLoggedIn, userControllers.account)
router.post('/account', catchErrors(userControllers.updateAccount))
router.post('/account/forgot', catchErrors(authController.forgot))
router.get('/account/reset/:token', catchErrors(authController.reset))
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update))

router.get('/map', jobPostControllers.mapPage);

router.get('/api/search', catchErrors(jobPostControllers.searchJobPosts))
router.get('/api/jobPosts/near', catchErrors(jobPostControllers.mapJobPosts));


module.exports = router
