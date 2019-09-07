const express = require('express');
const projectRouter = require('./projectsRouter.js');
const server = express();
// global middleware
server.use(express.json());
// server.use(logger)


server.use('/projects', projectRouter)


server.get('/', (req, res) => {
    res.status(200).json({ api: '...up' })
})
module.exports = server;