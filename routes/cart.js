const express = require("express");
const { Mongoose } = require("mongoose");
let cartRouter = express.Router();
const cartModels = require("../models/cartDbModels");
const Cart = cartModels;
let dataCart = [];

cartRouter.get("/display", function (req, res){
    Mongoose.collection("Cart").find({})
        .toArray(function(err, docs) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).render("pages/cart",{
            isLoggedIn: req.isLoggedIn,
            cart: JSON.stringify(docs)
      });
    
    });
});

cartRouter.get("/product/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    //add article in the basket
    switch (id){
        case 1:
            dataCart.push({

            });
            if (Cart.exists( {customerID: req.session.userid} ) ){
                let updatedCount = Cart.findOne({customerID: req.session.userid}).cartContents[0].count;
                Cart.updateOne({customerID: req.session.userid},{ $set: {"cartContents.0.count": updatedCount}});
            } else {
                let newCart = new Cart({
                    customerID: req.session.userid,
                    cartContents: [{
                        productID: 1,
                        name: "implant occulaire",
                        price: "2000",
                        count: 1
                    }]
                });
                newCart.save();
            }
            //add 1 to cart then display cart
            break;
        case 2:
            //add 2 to cart then display cart
            break;
        case 3:
            //add 3 to cart then display cart
            break;
        default:
            res.render("/pages/error",{
                error: "Ressource not found."
            });
    }
});

// cartRouter.put("/product/:id", (req, res) =>{
//     const id = parseInt(req.params.id);
//     //add +1 number of the article of corresponding id
// });

// cartRouter.delete("/product/:id", (req, res) =>{
//     const id = parseInt(req.params.id);
//     //delete corresponding product from the basket
// });
//mettre mongoose et schema dans un dossier modele/cart.js
// {
//     productID: 1,
//     name: "",
//     price: "2000",
//     count: 1
// }

module.exports = cartRouter;
