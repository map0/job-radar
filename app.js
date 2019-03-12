const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')(session)
const path = require('path')
const flash = require('connect-flash')
const routes = require('./routes/index')
const helpers = require('./helpers')
const errorHandlers = require('./handlers/errorHandlers')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(flash())

app.use((req, res, next) => {
  res.locals.h = helpers
  res.locals.currentPath = req.path
  res.locals.flashes = req.flash()
  next()
})

app.use('/', routes)

app.use(errorHandlers.notFound)

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors)

if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors)
}

app.use(errorHandlers.productionErrors)

module.exports = app
