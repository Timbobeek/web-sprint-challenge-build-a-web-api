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

//----------------------POST-------------------------

router.post("/", (req, res) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({
      message: "Please provide all of the info for the action",
    });
  } else {
    Action.insert({ project_id, description, notes })
      .then(({ id }) => {
        return Action.get(id);
      })
      .then((newAction) => {
        res.status(201).json(newAction);
      })
      .catch((err) => {
        res.status(500).json({
          message:
            "There was an error while saving the action to the database",
          error: err.message,
        });
      });
  }
});

//------------------------PUT-------------------------------

router.put("/:id", (req, res) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes ) {
    res.status(400).json({
      message: "Please provide all of the info for the action",
    });
  } else {
    Action.get(req.params.id)
      .then((action) => {
        if (!action) {
          res.status(404).json({
            message: "The action with the specified ID does not exist",
          });
        } else {
          return Action.update(req.params.id, req.body);
        }
      })
      .then((info) => {
        if (info) {
          return Action.get(req.params.id);
        }
      })
      .then((action) => {
        res.status(201).json(action);
      })
      .catch((err) => {
        res.status(500).json({
          message:
            "There was an error while saving the action to the database",
          error: err.message,
        });
      });
  }
});

//----------------------DELETE--------------------------

router.delete("/:id", async (req, res) => {
  try {
    const action = await Action.get(req.params.id);
    if (!action) {
      res.status(404).json({
        message: "The action with the specified ID does not exist",
      });
    } else {
      await Action.remove(req.params.id);
      res.status(201).json();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The action could not be removed",
    });
  }
});

module.exports = router;
