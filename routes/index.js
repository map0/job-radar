const express = require('express')
const jobControllers = require('../controllers/jobsController')

const router = express.Router()

router.get('/', jobControllers.home)

module.exports = router
