const express = require('express')
const app = express()
const port = 3000

var landing = require('./routes/landing')
var event = require('./routes/events')
var nus_landing = require('./routes/nus-landing')
var maincomm = require('./routes/maincomm')
var foc = require('./routes/foc')

app.use('/',landing)
app.use('/',event)
app.use('/',nus_landing)
app.use('/',maincomm)
app.use('/',foc)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})