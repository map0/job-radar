
exports.notFound = (req, res, next) => {
  const err = new Error('Ressource Not found')
  err.status = 404
  next(err)
}

exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || ''
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  }
  console.log(errorDetails)
  res.status(err.status || 500)
  res.format({
    // Based on the `Accept` http header
    'text/html': () => {
      res.render('error', errorDetails)
    }, // Form Submit, Reload the page
    'application/json': () => res.json(errorDetails) // Ajax call, send JSON back
    // default: () => res.status(406).send('Not Acceptable')
  })
}


/*
  Production Error Hanlder
  No stacktraces are leaked to user
*/
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  })
}
