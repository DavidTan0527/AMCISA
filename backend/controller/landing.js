const {check} = require('./base.js');

const landing = require('../model/landing.js')
const event = require('../model/event.js')

exports.getWithEvent = function(req, res) {
	check(req,res);

    Promise.all([landing.get(req.params.uni),event.get(req.params.uni)]).then(
        data => {
            event_sorted = data[1].sort((a,b)=> {
                var a = new Date(a.event_date);
                var b = new Date(b.event_date);
                return (a > b  ? -1 : 1)
            });
            
            required_event = event_sorted.slice(0,3);
            required_event = required_event.map(({title, picture, event_date}) => ({title, picture, event_date}));
            landing_data = data[0];
            landing_data.events = required_event;
            return res.json(landing_data);
        }
    );
};

exports.get = function(req, res) {
	check(req,res);

	landing.get(req.params.uni).then(data => {
		res.json(data);
	})
};

exports.create = function(req, res) {
	check(req,res);

	landing.create(req.params.uni, req.body).then((err) => {
		if (err){
			res.status(400).json({ errors: err });
		} else {
			res.send("Success")
		}
	});
};