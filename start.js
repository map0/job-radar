const app = require('./app');

app.set('port', process.env.PORT || 7878)
app.listen(app.get('port'), () => {
  console.log(`Express running on PORT ${app.get('port')}`)
})
