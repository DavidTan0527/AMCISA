const {check} = require('./base.js');

const qna = require('../model/qna.js')

exports.get = function(req, res) {
	check(req,res);

	qna.get(req.params.uni).then(data => {
		res.json(data);
	})
};

exports.create = function(req, res) {
	check(req,res);

	qna.create(req.params.uni, req.body).then(() => {
		res.send("Success")
	});
};