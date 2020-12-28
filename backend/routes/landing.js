const {router, getJson, addPrefix, param_rules, validationResult, fail} = require('./routes.js');

router.get('/:uni/landing', param_rules, function (req, res) {
    // If validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return fail(errors);
    }

    const _landing = addPrefix(req.params.uni, 'landing.json');
    const _event = addPrefix(req.params.uni, 'event.json');
    Promise.all([getJson(_landing),getJson(_event)]).then(
        data => {
            data = data.map(JSON.parse);
            event_sorted = data[1].sort((a,b)=> {
                var a = new Date(a.event_date);
                var b = new Date(b.event_date);
                return (a > b  ? -1 : 1)
            });
            
            required_event = event_sorted.slice(0,3);
            required_event = required_event.map(({title, picture, event_date}) => ({title, picture, event_date}));
            landing_data = data[0];
            landing_data.events = required_event;
            res.json(landing_data);
        }
    );
});

module.exports = router;