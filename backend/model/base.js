const fs = require('fs');
const util = require('util');
const crypto = require('crypto');
const isBase64 = require('is-base64');
const FileType = require('file-type');
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

function upload(buffer){
    const type = FileType.fromStream(buffer);
    const name = crypto.randomBytes(30).toString('hex');
    fs.writeFile('./data/images/' + name + type.ext, buffer, {encoding: 'base64'}, function(err) {
        return '/api/data/images/' + name + type.ext;
    });
}

module.exports = {upload, isBase64, getJson, writeJson, addPrefix};