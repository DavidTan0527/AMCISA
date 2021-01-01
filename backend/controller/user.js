const {check, generateAccessToken} = require('./base.js');

const user = require('../model/user.js')
const bcrypt = require('bcrypt');

exports.login = function(req, res) {
    check(req,res);
    
    const {username, password} = req.body;

    user.get().then(data => {
        _user = data.find(x => x.username == username);
        if (_user){
            bcrypt.compare(password, _user.password, function(err, _res) {
                if (_res) {
                    const token = generateAccessToken(username);
                    return res.json({token});
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

	user.get().then(data => {
        console.log("hi")
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