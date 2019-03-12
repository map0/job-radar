const express = require('express')
const jobPostControllers = require('../controllers/jobPostController')
const { catchErrors } = require('../handlers/errorHandlers')

const router = express.Router()

router.get('/', jobPostControllers.home)

router.get('/add', catchErrors(jobPostControllers.addJobPost))
router.post('/add', catchErrors(jobPostControllers.createJobPost))


module.exports = router
