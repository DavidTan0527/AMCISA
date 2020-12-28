const {check, generateAccessToken} = require('./base.js');

const user = require('../model/user.js')
const bcrypt = require('bcrypt');

exports.login = function(req, res) {
    check(req,res);
    
    const {username, password} = req.body;

    user.get().then(data => {
        user = data.find(x => x.username == username);
        if (user){
            bcrypt.compare(password, user.password, function(err, res) {
                if (res) {
                    return generateAccessToken(username);
                } else {
                    return res.status(401).send("username or password incorrect");
                } 
            });
        } else {
            return res.status(401).send("username or password incorrect");
        }
    })
    
}

exports.get = function(req, res) {
	check(req,res);

	user.get(req.params.uni).then(data => {
		res.json(data);
	})
};

exports.create = function(req, res) {
	check(req,res);

	user.create(req.body).then(() => {
		res.send("Success")
	});
};

exports.update = function(req, res) {
	check(req,res);

	user.update(req.body).then(() => {
		res.send("Success")
	});
};

exports.delete = function(req, res) {
	check(req,res);

	user.delete(req.body).then(() => {
		res.send("Success")
	});
};