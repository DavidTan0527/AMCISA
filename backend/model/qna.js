const {getJson, writeJson, addPrefix} = require('./base')

const qna = {}

qna.get = (uni) => {
    return getJson(addPrefix(uni,'qna.json')).then(data => {
        return JSON.parse(data);
    });
};

qna.create = (uni, body) => {
    return getJson(addPrefix(uni,'qna.json')).then(data => {
        data = JSON.parse(data);
        if (data.length != 0){
            body.id = data[data.length - 1].id + 1;
        } else {
            body.id = 1;
        }
        data.push(body);
        writeJson(addPrefix(uni,'qna.json'),data);
        return body;
    });
};


qna.update = (uni, body) => {
    return getJson(addPrefix(uni,'qna.json')).then(data => {
        data = JSON.parse(data);
        const index = data.findIndex(x => x.id == body.id);
        if (index != -1){
            data[index] = body;
            writeJson(addPrefix(uni,'qna.json'),data);
        } else {
            return "qna doesn't exist";
        }
    });
};


qna.delete = (uni, body) => {
    return getJson(addPrefix(uni,'qna.json')).then(data => {
        data = JSON.parse(data);
        const index = data.findIndex(x => x.id == body.id);
        if (index != -1){
            data.splice(index,1);
            writeJson(addPrefix(uni,'qna.json'),data);
        } else {
            return "qna doesn't exist";
        }
    });
};

module.exports = qna;