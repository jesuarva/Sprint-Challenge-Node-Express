const express = require('express');
const cors = require('cors');
const server = express();
const port = 6666;

const clients = require('./Routers/actionRouter');
const projects = require('./Routers/projectRouter');

server.use(cors({ origin: '*' }));
server.use(express.json());

server.use('/cients', clients);
server.use('/projects', projects);

server.listen(port, () => console.log('Server running on port %s ', port));
