const {check} = require('./base.js');

const main = require('../model/main.js')

exports.get = function(req, res) {
	main.get().then(data => {
		res.json(data);
	})
};

exports.create = function(req, res) {
	check(req,res);

	main.create(req.body).then((err) => {
		if (err){
			res.status(400).json({ errors: err });
		} else {
			res.send("Success")
		}
	});
};