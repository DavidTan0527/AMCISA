const {isBase64, getJson, writeJson, addPrefix, upload} = require('./base')


const foc = {}

foc.get = (uni) => {
    return getJson(addPrefix(uni,'foc.json')).then(data => {
        return JSON.parse(data);
    });
};

foc.create = (uni, body) => {
    if (isBase64(body.picture)){
        body.picture = upload(body.picture);
    }
    return writeJson(addPrefix(uni,'foc.json'),body);
};


module.exports = foc;