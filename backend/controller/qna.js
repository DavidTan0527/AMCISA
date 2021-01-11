const qna = require('../model/qna.js')
const { validationResult } = require('express-validator');

exports.get = function(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	qna.get(req.params.uni).then(data => {
		res.json(data);
	})
};

exports.create = function(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	qna.create(req.params.uni, req.body).then((err) => {
		console.log(err);
		if (err){
			res.status(400).json({ errors: err });
		} else {
			res.send("Success")
		}
	});
};

exports.update = function(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	qna.update(req.params.uni, req.body).then((err) => {
		if (err){
			res.status(400).json({ errors: err });
		} else {
			res.send("Success")
		}
	});
};

exports.delete = function(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	qna.delete(req.params.uni, req.body).then((err) => {
		if (err){
			res.status(400).json({ errors: err });
		} else {
			res.send("Success")
		}
	});
};