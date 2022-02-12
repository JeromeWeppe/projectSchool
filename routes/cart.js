const express = require("express");
let cartRouter = express.Router();
// const mongoose = require('mongoose');

cartRouter.get("/", (req, res) => {
    res.render("pages/cart",{
        isLoggedIn: req.isLoggedIn
    });
});

//require controler/cart.js
//foutre mongoose et schema dans un dossier modele/cart.js


module.exports = cartRouter;
