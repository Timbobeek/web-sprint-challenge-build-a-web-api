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

router.get('/:id', (req, res) => {
  Project.get(req.id)
    .then(project => {
      if (!project) {
          res.status(404).json({
            message: "The project with the specified ID does not exist"
          })
        }
        res.status(200).json(project)
    })
    .catch(err => {
      res.status(500).json({
        message: "The post information could not be retrieved",
        error: err.message
      })
    })
})

module.exports = router;