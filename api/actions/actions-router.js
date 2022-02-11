const Action = require("../actions/actions-model");

const router = require("express").Router();

const errorMiddleware = require("./actions-middleware");

//-----------------------GET--------------------------------------

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      if (!actions) {
        res.status(200).json([]);
      } else {
        res.status(200).json(actions);
      }
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
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
    .catch(next);
});

//----------------------POST-------------------------

router.post("/", (req, res, next) => {
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
      .catch(next);
  }
});

//------------------------PUT-------------------------------

router.put("/:id", (req, res, next) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
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
      .catch(next);
  }
});

//----------------------DELETE--------------------------

router.delete("/:id", async (req, res, next) => {
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
    next(error);
  }
});

router.use(errorMiddleware);

module.exports = router;
