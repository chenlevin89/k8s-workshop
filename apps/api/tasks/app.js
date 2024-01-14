const express = require('express');
const cookieParser = require('cookie-parser');
const setupContext = require('./middleware/context');
const userMiddleware = require('./middleware/user');

const healthcheckRouter = require('./routes/healthcheck');
const tasksRouter = require('./routes/tasks');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

setupContext(app);

app.use('/healthcheck', healthcheckRouter)
app.use('/tasks', userMiddleware , tasksRouter);


module.exports = app;
