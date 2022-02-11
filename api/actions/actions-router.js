const Action = require('../actions/actions-model');

const router = require('express').Router()

//-----------------------GET--------------------------------------

router.get('/', (req, res) => {
  Action.get()
    .then(actions => {
      if(!actions) {
        res.status(200).json([]);
      } else {
        res.status(200).json(actions);}
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "The actions information could not be retrieved",
      })
    })
})

router.get("/:id", (req, res) => {
  Action.get(req.params.id)
    .then((action) => {
      if (!action) {
        res.status(404).json({
          message: "The action with the specified ID does not exist",
        });
      } else {
        res.status(200).json(action);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "The action information could not be retrieved",
        error: err.message,
      });
    });
});

module.exports = router;
