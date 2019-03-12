const express = require('express')
const jobPostControllers = require('../controllers/jobPostController')

const router = express.Router()

router.get('/', jobPostControllers.home)

router.get('/add', jobPostControllers.addJobPost)
router.post('/add', jobPostControllers.createJobPost)


module.exports = router
