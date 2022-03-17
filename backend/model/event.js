const {getJson, writeJson, addPrefix} = require('./base')

const event = {}

event.get = (uni) => {
    return getJson(addPrefix(uni,'event.json')).then(data => {
        const parsedData = JSON.parse(data);

        parsedData.sort((a, b) => {
          return parseInt(b.id) - parseInt(a.id);
        })

        return parsedData;
    });
};

event.update = (uni, body) => {
    return getJson(addPrefix(uni,'event.json')).then(data => {
        data = JSON.parse(data);
        const index = data.findIndex(x => x.id == body.id);
        if (index != -1){
            data[index] = body;
            writeJson(addPrefix(uni,'event.json'),data);
        } else {
            return "event doesn't exist";
        }
    });
};

event.create = (uni, body) => {
   return getJson(addPrefix(uni,'event.json')).then(data => {
        data = JSON.parse(data);
        if (data.length != 0){
            body.id = data[data.length - 1].id + 1;
        } else {
            body.id = 1;
        }
        data.push(body);
        writeJson(addPrefix(uni,'event.json'),data);
        return body;
    });
};

event.delete = (uni, body) => {
    return getJson(addPrefix(uni,'event.json')).then(data => {
        data = JSON.parse(data);
        const index = data.findIndex(x => x.id == body.id);
        if (index != -1){
            data.splice(index,1);
            writeJson(addPrefix(uni,'event.json'),data);
        } else {
            return "event doesn't exist";
        }
    });
};

module.exports = event;
