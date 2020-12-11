const express = require('express')
const app = express()
const port = 5000

var landing = require('./routes/landing')

app.use('/',landing)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})