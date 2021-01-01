const {body, param} = require('express-validator');
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Validation rules
const uni_rules = [
    param('uni').exists().isIn(["nus","ntu"])
];


exports.event = {
    get : uni_rules,
    getPagination : uni_rules,
    getById : uni_rules,
    create : [
        authenticateJWT,
        param('uni').exists().isIn(["nus","ntu"]),
        body('title').exists(),
        body('picture').exists(),
        body('event_date').exists().isDate(),
        body('venue').exists(),
        body('author').exists(),
        body('created_date').exists().isDate(),
        body('content').exists()
    ],
    update : [
        authenticateJWT,
        param('uni').exists().isIn(["nus","ntu"]),
        body('id').exists().isInt(),
        body('title').exists(),
        body('picture').exists(),
        body('event_date').exists().isDate(),
        body('venue').exists(),
        body('author').exists(),
        body('created_date').exists().isDate(),
        body('content').exists()
    ],
    delete : [
        authenticateJWT,
        body('id').exists().isInt()
    ],
};

exports.user = {
    login : [
        body('username').exists(),
        body('password').exists()
    ],
    get : [
        authenticateJWT
    ],
    create : [
        body('username').exists(),
        body('password').exists()
    ],
    update : [
        authenticateJWT,
        body('id').exists().isInt(),
        body('username').exists(),
        body('password').exists()
    ],
    delete : [
        authenticateJWT,
        body('id').exists().isInt()
    ],
};

exports.contact = {
    get : uni_rules,
    create : [
        authenticateJWT
    ],
};

exports.foc = {
    get : uni_rules,
    create : [
        authenticateJWT
    ],
};

exports.landing = {
    get : uni_rules,
    create : [
        authenticateJWT
    ],
};

exports.main = {
    get : [],
    create : [
        authenticateJWT
    ],
};

exports.maincomm = {
    get : uni_rules,
    create : [
        authenticateJWT
    ],
};

exports.qna = {
    get : uni_rules,
    create : [
        authenticateJWT
    ],
};