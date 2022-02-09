//see jwt token
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const homeRouter = require('./routes/home');
const cartRouter = require('./routes/cart');
const userRouter = require('./routes/user');
const fetch = require('node-fetch');
const DB_URL = process.env.APP_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// app.use(cookieParser());
let session;
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:false,
    cookie: { 
        maxAge: oneDay,
        sameSite: 'strict'
    },
    resave: false
}));

const hostname = '127.0.0.1';
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded());

app.use('/', homeRouter);
app.use('/cart', cartRouter);
app.use('/user', userRouter);
app.get('/*', (req,res)=>{
    res.send("error 404 : page not found");
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
