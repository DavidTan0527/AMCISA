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
/**
 *  Routes
 */
var main = require('./routes/main');
var event = require('./routes/events');
var landing = require('./routes/main');
var maincomm = require('./routes/maincomm');
var contacts = require('./routes/contacts');
var foc = require('./routes/foc');
var qna = require('./routes/qna');

app.use('/',[main,event,landing,maincomm,contacts,foc,qna]);
app.use('/data/images',express.static('data/images'));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
