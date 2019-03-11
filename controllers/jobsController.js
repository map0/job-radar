// const path = require('path')

exports.home = ((req, res) => {
  res.render('layout')
  // res.sendFile(path.join(__dirname, '../views/pure.html'))
})