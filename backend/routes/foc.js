const {router, getJson, addPrefix, param_rules, validationResult, fail} = require('./routes.js');

router.get('/:uni/foc', param_rules, function (req, res) {
    // If validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return fail(errors);
    }

    getJson(addPrefix(req.params.uni,'foc.json')).then(data => {
        res.json(JSON.parse(data));
    });
});

module.exports = router;