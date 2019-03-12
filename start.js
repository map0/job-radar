const mongoose = require('mongoose')

require('dotenv').config({ path: 'variables.env' })

mongoose.Promise = global.Promise

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })

mongoose.connection.on('error', (err) => {
  console.error(`Oh nooo -> ${err.message}`)
})
require('./models/JobPost')

const app = require('./app');

app.set('port', process.env.PORT || 7878)
app.listen(app.get('port'), () => {
  console.log(`Express running on PORT ${app.get('port')}`)
})
