var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET);
}

function check(req, res){
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
}

module.exports = { check, generateAccessToken };