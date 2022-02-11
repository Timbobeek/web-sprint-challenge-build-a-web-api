const express = require("express");
const loggerMiddleware = require("./middleware/logger-middleware");
const server = express();

server.use(express.json());
server.use(loggerMiddleware);

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

module.exports = server;
