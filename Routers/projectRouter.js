const projects = require('express').Router();
const db = require('../data/helpers/projectModel');
const routerFactory = require('./routerFactory');

routerFactory(projects, db);

module.exports = projects;
