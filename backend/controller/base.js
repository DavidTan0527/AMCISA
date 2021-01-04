var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


function generateAccessToken(username,uni) {
    return jwt.sign({username,uni}, process.env.TOKEN_SECRET,{ expiresIn: '30d' });
}

module.exports = { generateAccessToken };