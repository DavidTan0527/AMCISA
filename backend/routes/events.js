var express = require('express')
var router = express.Router()

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

function getJson(filePath){
    return readFile('./data/' + filePath);
}

router.get('/events', function (req, res) {
    getJson('event.json').then( data =>{
        data = JSON.parse(data).data;
        data = data.map(({id, title, picture, event_date, venue}) => ({id, title, picture, event_date, venue}))
        res.send(data)
    })
})

router.get('/events/:id', function (req, res) {
    getJson('event.json').then( data =>{
        data = JSON.parse(data).data;
        for (let i of data){
            if (i.id == req.params.id){
                res.send(i)
                break;
            };
        }
    })
})



module.exports = router