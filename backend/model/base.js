const {Storage} = require('@google-cloud/storage');

const storage = new Storage({
    projectId: process.env.PROJECT_ID, 
    keyFilename: process.env.KEY_PATH
});

const bucket = storage.bucket(process.env.PROJECT_ID);

function getJson(filePath) {
    const file = bucket.file('data/' + filePath);
    return file.download();
}

function writeJson(filePath, data){
    const file = bucket.file('data/' + filePath);
    return file.save(JSON.stringify(data));
}

function addPrefix(uni,file){
    return uni + '/' + file;
}

module.exports = {getJson, writeJson, addPrefix};