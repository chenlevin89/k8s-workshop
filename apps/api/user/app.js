const express = require('express');
const cookieParser = require('cookie-parser');

const healthcheckRouter = require('./routes/healthcheck');
const userRouter = require('./routes/user');


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use((req,res,next)=>{
    console.log(req.get('canary-version'))
    next();
})
app.use('/healthcheck', healthcheckRouter)
app.use('/user', userRouter);


module.exports = app;
