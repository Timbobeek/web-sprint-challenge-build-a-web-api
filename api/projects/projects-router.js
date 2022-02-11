const Project = require("../projects/projects-model");

const router = require("express").Router();

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

router.get("/:id", (req, res) => {
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
    .catch((err) => {
      res.status(500).json({
        message: "The project information could not be retrieved",
        error: err.message,
      });
    });
});

//-----------------------POST--------------------------------------

router.post("/", (req, res) => {
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
      .catch((err) => {
        res.status(500).json({
          message:
            "There was an error while saving the project to the database",
          error: err.message,
        });
      });
  }
});

//---------------------------PUT--------------------------------

router.put("/:id", (req, res) => {
  const { description, name, completed } = req.body;
  if (!description || !name || completed === undefined) {
    res.status(400).json({
      message: "Please provide description, name, and completion for the project",
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
      .catch((err) => {
        res.status(500).json({
          message:
            "There was an error while saving the project to the database",
          error: err.message,
        });
      });
  }
});

//--------------------------DELETE-----------------------------------

router.delete("/:id", async (req, res) => {
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
    console.log(error);
    res.status(500).json({
      message: "The project could not be removed",
    });
  }
});

//--------------------------GET w/actions-------------------------------

router.get("/:id/actions", (req, res) => {
  Project.get(req.params.id)
    .then((project) => {
      if (!project) {
        res
          .status(404)
          .json({
            message: "The project with the specified ID does not exist",
          });
      }
      else {
        return Project.getProjectActions(req.params.id)
      }
    })
    .then(actions =>{
      res.status(200).json(actions)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The actions information could not be retrieved",
      });
    });
});


router.use((err, req, res, next)=>{
  res.status(err.status || 500).json({
    custom: 'This info could not be retrieved!',
    message: err.message,
    stack: err.stack
  })
})



module.exports = router;
