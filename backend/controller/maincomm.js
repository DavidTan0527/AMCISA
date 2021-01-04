const {check} = require('./base.js');

const maincomm = require('../model/maincomm.js')

exports.get = function(req, res) {
	check(req,res);

	maincomm.get(req.params.uni).then(data => {
		res.json(data);
	})
};

exports.create = function(req, res) {
	check(req,res);

	maincomm.create(req.params.uni, req.body).then((err) => {
		if (err){
			res.status(400).json({ errors: err });
		} else {
			res.send("Success")
		}
	});
};