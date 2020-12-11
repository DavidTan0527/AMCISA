const express = require('express')
const app = express()
const port = 3000

var landing = require('./routes/landing')
var event = require('./routes/events')
var nus_landing = require('./routes/nus-landing')

app.use('/',landing)
app.use('/',event)
app.use('/',nus_landing)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})