const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");

const homeRouter = require("./routes/home");
const cartRouter = require("./routes/cart");
const userRouter = require("./routes/user");

const DB_URL = process.env.APP_URL;
const sessionSecret = process.env.SECRET;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: sessionSecret,
    saveUninitialized:false, // don't create session until something stored
    cookie: { 
        maxAge: oneDay,
        sameSite: "strict"
    },
    resave: false, //don't save session if unmodified
    store: MongoStore.create({
        mongoUrl: DB_URL
    })
}));

app.use((req, res, next)=>{
    let session = req.session;
    req.isLoggedIn = (session && session.userid) != undefined;
    next();
});

const hostname = "127.0.0.1";
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded());

app.use("/", homeRouter);
app.use("/cart", cartRouter);
app.use("/user", userRouter);
app.get("/*", (req,res)=>{
    res.status(404).render("pages/error",{
        error: "Error 404 : ressource not found.",
        isLoggedIn: req.isLoggedIn
    });
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
