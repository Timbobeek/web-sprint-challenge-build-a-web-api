const Action = require('../actions/actions-model');

const router = require('express').Router()

//-----------------------GET--------------------------------------

router.get('/', (req, res) => {
  Action.get(req.query)
    .then(actions => {
      if(!actions) {
        res.json([])
      }
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "The actions information could not be retrieved",
      })
    })
})

module.exports = router;
