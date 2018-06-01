const express = require('express');

const port = 6666;
const server = express();

server.listen(port, () => console.log('Server running on port %s ', port));
