const {getJson, writeJson, addPrefix} = require('./base')

const main = {}

main.get = () => {
    return getJson('main.json').then(data => {
        return JSON.parse(data);
    });
};

main.create = (body) => {
    return writeJson('main.json',body);
};


module.exports = main;