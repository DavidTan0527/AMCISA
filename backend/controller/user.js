const {generateAccessToken} = require('./base.js');

const user = require('../model/user.js')
const bcrypt = require('bcrypt');

exports.login = function(req, res) {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
    
    const {username, password} = req.body;

    user.get().then(data => {
        _user = data.find(x => x.username == username);
        if (_user){
            bcrypt.compare(password, _user.password, function(err, _res) {
                if (_res) {
                    const token = generateAccessToken(_user.username,_user.uni);
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
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	user.get().then(data => {
        console.log("hi")
		res.json(data);
	})
};

exports.create = function(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	user.create(req.body).then((err) => {
		if (err){
			res.status(400).json({ errors: err });
		} else {
			res.send("Success")
		}
	});
};

exports.update = function(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	user.update(req.body).then((err) => {
        if (err){
			res.status(400).json({ errors: err });
		} else {
			const token = generateAccessToken(req.body.username,req.body.uni);
            return res.json({token})
		}
	});
};

exports.delete = function(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	user.delete(req.body).then((err) => {
		if (err){
			res.status(400).json({ errors: err });
		} else {
			res.send("Success")
		}
	});
};