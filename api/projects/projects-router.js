const Project = require('../projects/projects-model');

const router = require('express').Router()

//-----------------------GET--------------------------------------

router.get('/', (req, res) => {
  Project.get(req.body)
    .then(projects => {
      if(!projects) {
        res.json([])
      }
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "The projects information could not be retrieved",
      })
    })
})

module.exports = router;