const {getJson, writeJson, addPrefix} = require('./base')


const foc = {}

foc.get = (uni) => {
    return getJson(addPrefix(uni,'foc.json')).then(data => {
        return JSON.parse(data);
    });
};

foc.create = (uni, body) => {
    return writeJson(addPrefix(uni,'foc.json'),body);
};


module.exports = foc;