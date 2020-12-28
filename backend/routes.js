var express = require('express');
var router = express.Router();

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
router.get('/:uni/contacts'      , validator.contact.get         , contact.get);
router.get('/:uni/events/:count' , validator.event.getPagination , event.getPagination);
router.get('/:uni/event/:id'     , validator.event.getById       , event.getById);
router.get('/:uni/foc'           , validator.foc.get             , foc.get);
router.get('/:uni/landing'       , validator.landing.get         , landing.get);
router.get('/main'               , validator.main.get            , main.get);
router.get('/:uni/maincomm'      , validator.maincomm.get        , maincomm.get);
router.get('/:uni/qna'           , validator.qna.get             , qna.get);

/**
 * Admin route
 */

// events
router.post('/:uni/event'       , validator.event.create, event.create);
router.put('/:uni/event/:id'    , validator.event.update, event.update);
router.delete('/:uni/event/:id' , validator.event.delete, event.delete);

// users
router.post('/user'       , validator.user.create, user.create);
router.put('/user/:id'    , validator.user.update, user.update);
router.delete('/user/:id' , validator.user.delete, user.delete);

router.post('/:uni/contacts' , validator.contact.create , contact.create);
router.post('/:uni/foc'      , validator.foc.create     , foc.create);
router.post('/:uni/landing'  , validator.landing.create , landing.create);
router.post('/main'          , validator.main.create    , main.create);
router.post('/:uni/maincomm' , validator.maincomm.create, maincomm.create);
router.post('/:uni/qna'      , validator.qna.create     , qna.create);

module.exports = router;