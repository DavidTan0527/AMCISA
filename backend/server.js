const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

if (!process.env.NODE_ENV) 
  process.env.NODE_ENV = 'development';

if (process.env.NODE_ENV === 'development') {
  console.log("CORS enabled");
  app.use(cors());
}

var landing = require('./routes/landing');
var event = require('./routes/events');
var nus_landing = require('./routes/nus-landing');
var maincomm = require('./routes/maincomm');
var contacts = require('./routes/contacts');
var foc = require('./routes/foc');

app.use('/',landing);
app.use('/',event);
app.use('/',nus_landing);
app.use('/',maincomm);
app.use('/', contacts);
app.use('/',foc);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
