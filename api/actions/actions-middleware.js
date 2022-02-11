// add middlewares here related to actions
const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "Action info could not be retrieved!",
    message: err.message,
    stack: err.stack,
  });
};

module.exports = errorMiddleware;
