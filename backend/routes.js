var express = require('express');
var router = express.Router();
const crypto = require('crypto');


var contact  = require('./controller/contact');
var event    = require('./controller/event');
var foc      = require('./controller/foc');
var landing  = require('./controller/landing');
var main     = require('./controller/main');
var maincomm = require('./controller/maincomm');
var qna      = require('./controller/qna');
var user     = require('./controller/user');

var validator = require('./validator');

/**
 * User route
 */
router.get('/:uni/contact'       , validator.contact.get         , contact.get);
router.get('/:uni/events/:count' , validator.event.getPagination , event.getPagination);
router.get('/:uni/event/:id'     , validator.event.getById       , event.getById);
router.get('/:uni/foc'           , validator.foc.get             , foc.get);
router.get('/:uni/landing'       , validator.landing.getWithEvent, landing.getWithEvent);
router.get('/main'               , validator.main.get            , main.get);
router.get('/:uni/maincomm'      , validator.maincomm.get        , maincomm.get);
router.get('/:uni/qna'           , validator.qna.get             , qna.get);

/**
 * Admin route
 */

// events
router.post('/:uni/event'       , validator.event.create, event.create);
router.put('/:uni/event'        , validator.event.update, event.update);
router.delete('/:uni/event'     , validator.event.delete, event.delete);

// users
router.post('/login'      , validator.user.login , user.login);
router.get('/user'        , validator.user.get   , user.get);
router.post('/user'       , validator.user.create, user.create);
router.put('/user'        , validator.user.update, user.update);
router.delete('/user'     , validator.user.delete, user.delete);

router.post('/:uni/qna'       , validator.qna.create, qna.create);
router.put('/:uni/qna'        , validator.qna.update, qna.update);
router.delete('/:uni/qna'     , validator.qna.delete, qna.delete);

router.post('/:uni/contact'  , validator.contact.create , contact.create);
router.post('/:uni/foc'      , validator.foc.create     , foc.create);
router.post('/:uni/landing'  , validator.landing.create , landing.create);
router.post('/main'          , validator.main.create    , main.create);
router.post('/:uni/maincomm' , validator.maincomm.create, maincomm.create);

router.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
  
    let File = req.files.file;
  
    const name = crypto.randomBytes(20).toString('hex') + File.name;

    File.mv('./data/images/' + name, (err) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.json({path : '/api/data/images/' + name});
    });
});

module.exports = router;