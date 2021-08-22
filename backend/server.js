const express = require('express'); 
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

if (!process.env.NODE_ENV) 
  process.env.NODE_ENV = 'development';

console.log("CORS enabled");
app.use(cors());

app.use(express.json());
app.use(fileUpload());

var routes = require('./routes');
app.use('/',routes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
