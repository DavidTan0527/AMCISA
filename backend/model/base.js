const fs = require('fs');
const util = require('util');
const crypto = require('crypto');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

function getJson(filePath) {
    return readFile('./data/' + filePath);
}

function writeJson(filePath, data){
    return writeFile('./data/' + filePath, JSON.stringify(data));
}

function addPrefix(uni,file){
    return uni + '/' + file;
}

module.exports = {getJson, writeJson, addPrefix};