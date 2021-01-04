const {check} = require('./base.js');

const event = require('../model/event.js')

exports.getPagination = function(req, res) {
	check(req,res);

    event.get(req.params.uni).then(data => {
        data = data.map(({ id, title, picture, event_date, venue }) => ({ id, title, picture, event_date, venue }));
        let formatted_data = [];
        let medium_arr = [];
        for (let i = 0; i < data.length; i++) {
            if (i % req.params.count == 0 && i != 0) {
                formatted_data.push(medium_arr);
                medium_arr = [];
            }
            medium_arr.push(data[i]);
        };
        formatted_data.push(medium_arr);
        res.json(formatted_data);
    });
};

exports.getById = function(req, res) {
	check(req,res);

    event.get(req.params.uni).then(data => {
        const result = data.find(e => e.id == req.params.id);
        res.json(result || {});
    })
};

exports.get = function(req, res) {
	check(req,res);

	event.get(req.params.uni).then(data => {
		res.json(data);
	})
};

exports.create = function(req, res) {
	check(req,res);

	event.create(req.params.uni, req.body).then((data) => {
		res.json(data);
	});
};

exports.update = function(req, res) {
	check(req,res);

	event.update(req.params.uni, req.body).then((err) => {
		if (err){
			res.status(400).json({ errors: err });
		} else {
			res.send("Success")
		}
	});
};

exports.delete = function(req, res) {
	check(req,res);

	event.delete(req.params.uni, req.body).then((err) => {
		if (err){
			res.status(400).json({ errors: err });
		} else {
			res.send("Success")
		}
	});
};