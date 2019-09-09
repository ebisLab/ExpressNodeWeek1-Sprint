const express = require('express');
const projectRouter = require('./projectsRouter.js');
const actionRouter = require('./actionsRouter');
const server = express();
// global middleware
server.use(express.json());
// server.use(logger)


server.use('/projects', projectRouter)
server.use('/actions', actionRouter)


server.get('/', (req, res) => {
    res.status(200).json({ api: '...up' })
})
module.exports = server;