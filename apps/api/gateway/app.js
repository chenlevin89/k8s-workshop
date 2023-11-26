const express = require('express');
const cookieParser = require('cookie-parser');

const healthcheckRouter = require('./routes/healthcheck');
const routes = require('./routes/routes');
const proxySetup = require('./proxy');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/healthcheck', healthcheckRouter);

app.use((err, req, res, next) => {
    console.error(err.stack)
    next(err);
})

proxySetup(app, routes);

module.exports = app;
