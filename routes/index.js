const express = require('express')
// const path = require('path')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('layout')
  // res.sendFile(path.join(__dirname, '../views/pure.html'))
})

module.exports = router
