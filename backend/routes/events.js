const {router, getJson, addPrefix, param_rules, validationResult, fail, param} = require('./routes.js');

router.get('/:uni/events/:count', param_rules, param('count').exists().isInt(), function (req, res) {
    // If validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return fail(errors);
    }

    getJson(addPrefix(req.params.uni,'event.json')).then(data => {
        data = JSON.parse(data);
        data = data.map(({ id, title, picture, event_date, venue }) => ({ id, title, picture, event_date, venue }));
        let formatted_data = [];
        let medium_arr = [];
        for (let i = 0; i < data.length; i++) {
            if (i % req.params.count == 0 && i != 0) {
                formatted_data.push(medium_arr);
                medium_arr = [];
            }
            medium_arr.push(data[i]);
        };
        formatted_data.push(medium_arr);
        res.json(formatted_data);
    });
});

router.get('/:uni/event/:id', param_rules, param('id').exists().isInt(), function (req, res) {
    // If validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return fail(errors);
    }

    getJson(addPrefix(req.params.uni,'event.json')).then(data => {
        data = JSON.parse(data);
        const result = data.find(e => e.id == req.params.id);
        res.json(result || {});
    })
})

module.exports = router;