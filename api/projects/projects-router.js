const Project = require("../projects/projects-model");

const router = require("express").Router();

const errorMiddleware = require("./projects-middleware");

//-----------------------GET--------------------------------------

router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      if (!projects) {
        res.status(200).json([]);
      } else {
        res.status(200).json(projects);
      }
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Project.get(req.params.id)
    .then((project) => {
      if (!project) {
        res.status(404).json({
          message: "The project with the specified ID does not exist",
        });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(next);
});

//-----------------------POST--------------------------------------

router.post("/", (req, res, next) => {
  const { description, name, completed } = req.body;
  if (!description || !name) {
    res.status(400).json({
      message: "Please provide all of the info for the project",
    });
  } else {
    Project.insert({ description, name, completed })
      .then(({ id }) => {
        return Project.get(id);
      })
      .then((newProject) => {
        res.status(201).json(newProject);
      })
      .catch(next);
  }
});

//---------------------------PUT--------------------------------

router.put("/:id", (req, res, next) => {
  const { description, name, completed } = req.body;
  if (!description || !name || completed === undefined) {
    res.status(400).json({
      message:
        "Please provide description, name, and completion for the project",
    });
  } else {
    Project.get(req.params.id)
      .then((project) => {
        if (!project) {
          res.status(404).json({
            message: "The project with the specified ID does not exist",
          });
        } else {
          return Project.update(req.params.id, req.body);
        }
      })
      .then((info) => {
        if (info) {
          return Project.get(req.params.id);
        }
      })
      .then((project) => {
        res.status(201).json(project);
      })
      .catch(next);
  }
});

//--------------------------DELETE-----------------------------------

router.delete("/:id", async (req, res, next) => {
  try {
    const project = await Project.get(req.params.id);
    if (!project) {
      res.status(404).json({
        message: "The project with the specified ID does not exist",
      });
    } else {
      await Project.remove(req.params.id);
      res.status(201).json();
    }
  } catch (error) {
    next(error);
  }
});

//--------------------------GET w/actions-------------------------------

router.get("/:id/actions", (req, res, next) => {
  Project.get(req.params.id)
    .then((project) => {
      if (!project) {
        res.status(404).json({
          message: "The project with the specified ID does not exist",
        });
      } else {
        return Project.getProjectActions(req.params.id);
      }
    })
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.use(errorMiddleware);

module.exports = router;
