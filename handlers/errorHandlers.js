exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.notFound = (req, res, next) => {
  const err = new Error('Ressource Not found')
  err.status = 404
  next(err)
}

/*
  MongoDB Validation Error Handler
  Detect if there are mongodb validation errors that we can nicely show via flash messages
*/
exports.flashValidationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err)
  // validation errors look like
  const errorKeys = Object.keys(err.errors)
  errorKeys.forEach(key => req.flash('error', err.errors[key].message))
  res.redirect('back')
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
