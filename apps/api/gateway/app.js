const express = require('express');
const cookieParser = require('cookie-parser');

const healthcheckRouter = require('./routes/healthcheck');
const routes = require('./routes/routes');
const loggerSetup = require('./middleware/logger');
const authSetup = require('./middleware/auth');
const proxySetup = require('./middleware/proxy');

const app = express();

loggerSetup(app);
authSetup(app, routes);
proxySetup(app, routes);

app.use('/healthcheck', healthcheckRouter);

app.use((err, req, res, next) => {
    console.error(err.stack)
    next(err);
});

module.exports = app;
