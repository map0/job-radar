const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('routing works')
})

module.exports = router
