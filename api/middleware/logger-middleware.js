function loggerMiddleware(req, res, next) {
  const timestamp = new Date().toLocaleString();
  console.log(`${req.method} ${req.url} || timestamp ---> ${timestamp} `);
  next();
}

module.exports = loggerMiddleware;
