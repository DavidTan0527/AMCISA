const {getJson, writeJson} = require('./base')
const bcrypt = require('bcrypt');

const user = {}

user.get = () => {
    return getJson('user.json').then(data => {
        return JSON.parse(data);
    });
};

user.update = (body) => {
    return getJson('user.json').then(data => {
        data = JSON.parse(data);
        const index = items.findIndex(x => x.id == body.id);
        if (index != -1){
            data[index] = body;
            writeJson('user.json',data);
        } else {
            return "user doesn't exist";
        }
    });
};

user.create = (body) => {
    return getJson('user.json').then(data => {
        data = JSON.parse(data);
        if (data.length != 0){
            body.id = data[data.length - 1].id + 1;
        } else {
            body.id = 1;
        }
        bcrypt.hash(body.password, 10, (err, hash) => {
            body.password = hash;
            data.push(body);
            writeJson('user.json',data);
        });
    });
};

user.delete = (body) => {
    return getJson('user.json').then(data => {
        data = JSON.parse(data);
        const index = items.findIndex(x => x.id == body.id);
        if (index != -1){
            data.splice(index,1);
            writeJson('user.json',data);
        } else {
            return "user doesn't exist";
        }
    });
};

module.exports = user;