const express = require('express');
const server = express();

server.use(express.json());
server.use(loggerMiddleware);

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router')

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

function loggerMiddleware (req,res,next){
  const timestamp = new Date().toLocaleString()
  console.log(`${req.method} ${req.url} || timestamp ---> ${timestamp} `)
  next()
}

module.exports = server;


