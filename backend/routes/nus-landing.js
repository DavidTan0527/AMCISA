var express = require('express')
var router = express.Router()

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

function getJson(filePath){
    return readFile('./data/' + filePath);
}


router.get('/nus-landing', function (req, res) {
    Promise.all([getJson('nus-landing.json'),getJson('event.json')]).then(
        data => {
            data = data.map(JSON.parse);
            event_sorted = data[1].data.sort((a,b)=> {
                var a = new Date(a.event_date);
                var b = new Date(b.event_date);
                return (a > b  ? -1 : 1)
            })
            
            required_event = event_sorted.slice(0,3);
            required_event = required_event.map(({picture,event_date}) => ({picture, event_date}));
            nus_landing_data = data[0]
            nus_landing_data["events"] = required_event
            res.send(nus_landing_data)
        }
    )
})



module.exports = router