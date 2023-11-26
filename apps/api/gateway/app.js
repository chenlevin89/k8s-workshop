const express = require('express');
const cookieParser = require('cookie-parser');

const healthcheckRouter = require('./routes/healthcheck');
const routes = require('./routes/routes');
const proxySetup = require('./proxy');

const app = express();

proxySetup(app, routes);

app.use('/healthcheck', healthcheckRouter);

app.use((err, req, res, next) => {
    console.error(err.stack)
    next(err);
});

module.exports = app;
