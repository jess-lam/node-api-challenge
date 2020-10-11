const express = require('express');
const actionRouter = require('./routers/actionRouter');
const projectRouter = require('./routers/projectRouter');

const server = express();

server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });

module.exports = server;