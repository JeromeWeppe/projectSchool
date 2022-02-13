const express = require("express");
let cartRouter = express.Router();
// const mongoose = require('mongoose');

cartRouter.get("/display", function (req, res){
    res.render("pages/cart",{
        isLoggedIn: req.isLoggedIn
    });
});

cartRouter.post("/product/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    //add article in the basket
})

cartRouter.put("/product/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    //add +1 number of the article of corresponding id
})

cartRouter.delete("/product/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    
})
//foutre mongoose et schema dans un dossier modele/cart.js


module.exports = cartRouter;
