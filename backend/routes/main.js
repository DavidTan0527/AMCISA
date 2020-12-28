const {router, getJson} = require('./routes.js');

router.get('/main', function (req, res) {
    getJson('main.json').then(data => {
        res.json(JSON.parse(data));
    });
});

module.exports = router;