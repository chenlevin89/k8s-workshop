const express = require('express');
const cookieParser = require('cookie-parser');

const healthcheckRouter = require('./routes/healthcheck');
const tasksRouter = require('./routes/tasks');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/healthcheck', healthcheckRouter)
app.use('/tasks', tasksRouter);


module.exports = app;
