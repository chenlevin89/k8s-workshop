const express = require('express');
const cookieParser = require('cookie-parser');

const healthcheckRouter = require('./routes/healthcheck');
const authRouter = require('./routes/auth');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/healthcheck', healthcheckRouter)
app.use('/auth', authRouter);


module.exports = app;
