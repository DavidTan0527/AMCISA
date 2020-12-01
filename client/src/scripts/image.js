const fs = require('fs');

function saveImg(img) {
  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const buf = Buffer.from(data, 'base64');
  console.log(fs);
  fs.writeFile('store/image.png', buf);
}

module.exports = { saveImg };
