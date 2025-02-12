// add middlewares here related to projects

const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "Project info could not be retrieved!",
    message: err.message,
    stack: err.stack,
  });
};

module.exports = errorMiddleware;
