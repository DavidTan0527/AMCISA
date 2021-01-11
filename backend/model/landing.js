const {getJson, writeJson, addPrefix} = require('./base')

const landing = {}

landing.get = (uni) => {
    return getJson(addPrefix(uni,'landing.json')).then(data => {
        return JSON.parse(data);
    });
};

landing.create = (uni, body) => {
    return writeJson(addPrefix(uni,'landing.json'),body);
};


module.exports = landing;