const {getJson, writeJson, addPrefix} = require('./base')

const contact = {}

contact.get = (uni) => {
    return getJson(addPrefix(uni,'contact.json')).then(data => {
        return JSON.parse(data);
    });
};

contact.create = (uni, body) => {
    return writeJson(addPrefix(uni,'contact.json'),body);
};


module.exports = contact;