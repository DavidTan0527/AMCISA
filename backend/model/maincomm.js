const {isBase64, getJson, writeJson, addPrefix, upload} = require('./base')

const maincomm = {}

maincomm.get = (uni) => {
    return getJson(addPrefix(uni,'maincomm.json')).then(data => {
        return JSON.parse(data);
    });
};

maincomm.create = (uni, body) => {
    if (isBase64(body.pres_picture)){
        body.pres_picture = upload(body.pres_picture);
    }
    for (member in body.member){
        if (isBase64(member.picture)){
            body.picture = upload(body.picture);
        }
    }
    return writeJson(addPrefix(uni,'maincomm.json'),body);
};


module.exports = maincomm;