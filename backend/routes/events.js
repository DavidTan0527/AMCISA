var express = require('express')
var router = express.Router()

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

function getJson(filePath){
    return readFile('./data/' + filePath);
}

router.get('/events/:id', function (req, res) {
    getJson('event.json').then( data =>{
        data = JSON.parse(data).data;
        data = data.map(({id, title, picture, event_date, venue}) => ({id, title, picture, event_date, venue}))
        let formatted_data = [];
        let medium_arr = [];
        for (let i = 0; i < data.length; i++){
            if (i % req.params.id == 0 && i != 0){
                formatted_data.push(medium_arr);
                medium_arr = []
            }
            medium_arr.push(data[i])
        };
        formatted_data.push(medium_arr);
        res.send(formatted_data)
    })
})

router.get('/event/:id', function (req, res) {
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