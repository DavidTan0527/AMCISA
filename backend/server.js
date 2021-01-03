const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

if (!process.env.NODE_ENV) 
  process.env.NODE_ENV = 'development';

if (process.env.NODE_ENV === 'development') {
  console.log("CORS enabled");
  app.use(cors());
}

app.use(express.json());

var routes = require('./routes');
app.use('/',routes);
app.use('/data/images',express.static('data/images'));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
