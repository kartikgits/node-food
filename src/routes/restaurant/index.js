const express = require('express');

const restaurantRouter = require('./restaurant')

const app = express();

app.use('/', restaurantRouter);
require('./auth')(app);

module.exports = app;