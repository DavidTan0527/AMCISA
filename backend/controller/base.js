var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

function generateAccessToken(username,uni) {
    return jwt.sign({username,uni}, process.env.TOKEN_SECRET,{ expiresIn: '30d' });
}

function check(req, res){
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
}

module.exports = { check, generateAccessToken };