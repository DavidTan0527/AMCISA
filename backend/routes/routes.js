var express = require('express');
var router = express.Router();

const { param, validationResult } = require('express-validator');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const fail = (error) => res.status(400).json({ errors: errors.array() });

// Validation rules
const param_rules = [ 
    param('uni').exists().custom(uni => uni == "nus" || uni == "ntu" )
];   

function getJson(filePath) {
    return readFile('./data/' + filePath);
}

function addPrefix(uni,file){
    return uni + '/' + file;
}

module.exports = {router, getJson, addPrefix, param_rules, validationResult, fail, param};