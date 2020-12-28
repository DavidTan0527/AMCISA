const {getJson, writeJson, addPrefix} = require('./base')

const maincomm = {}

maincomm.get = (uni) => {
    return getJson(addPrefix(uni,'maincomm.json')).then(data => {
        return JSON.parse(data);
    });
};

maincomm.create = (uni, body) => {
    return writeJson(addPrefix(uni,'maincomm.json'),body);
};


module.exports = maincomm;