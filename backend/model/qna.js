const {getJson, writeJson, addPrefix} = require('./base')

const qna = {}

qna.get = (uni) => {
    return getJson(addPrefix(uni,'qna.json')).then(data => {
        return JSON.parse(data);
    });
};

qna.create = (uni, body) => {
    return writeJson(addPrefix(uni,'qna.json'),body);
};

module.exports = qna;