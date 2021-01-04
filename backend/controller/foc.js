const {check} = require('./base.js');

const foc = require('../model/foc.js')

exports.get = function(req, res) {
	check(req,res);

	foc.get(req.params.uni).then(data => {
		res.json(data);
	})
};

exports.create = function(req, res) {
	check(req,res);

	foc.create(req.params.uni, req.body).then((err) => {
		if (err){
			res.status(400).json({ errors: err });
		} else {
			res.send("Success")
		}
	});
};