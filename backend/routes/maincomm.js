var express = require('express')
var router = express.Router()

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

function getJson(filePath){
    return readFile('./data/' + filePath);
}

router.get('/maincomm', function (req, res) {
    getJson('maincomm.json').then( data =>{
        data = JSON.parse(data);
        res.send(data)
    })
})



module.exports = router