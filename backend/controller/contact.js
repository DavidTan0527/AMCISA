const {check} = require('./base.js');

const contact = require('../model/contact.js')

exports.get = function(req, res) {
	check(req,res);

	contact.get(req.params.uni).then(data => {
		res.json(data);
	})
};

exports.create = function(req, res) {
	check(req,res);

	contact.create(req.params.uni, req.body).then(() => {
		res.send("Success")
	});
};