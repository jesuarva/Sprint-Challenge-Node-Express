const clients = require('express').Router();
const db = require('../data/helpers/actionModel');
const routerFactory = require('./routerFactory');

routerFactory(clients, db);

module.exports = clients;
