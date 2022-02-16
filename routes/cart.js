const express = require("express");
// const { Mongoose } = require("mongoose");
let cartRouter = express.Router();
const cartModels = require("../models/cartDbModels");
const Cart = cartModels;

cartRouter.get("/display", function (req, res){
    Cart.findOne({customerID: req.session.userid}, function(err, docs) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).render("pages/cart",{
            isLoggedIn: req.isLoggedIn,
            cart: docs
      });
    });
});

cartRouter.get("/add/:id", (req, res) =>{
    let checkCart;
    let id = parseInt(req.params.id);
    Cart.count({customerID: req.session.userid}, function (err, count){

        if (count > 0){
            // console.log(count);
            checkCart = true;
        } else {
            // console.log(count);
            checkCart = false;
        }
        if (checkCart) {
            Cart.findOne({customerID: req.session.userid},function(err,obj) {
                obj.cartContents[id - 1].count = obj.cartContents[id - 1].count + 1;
                console.log(obj);
                Cart.updateOne({customerID: req.session.userid}, obj, function(err, result){
                    console.log(result);
                    res.redirect("/cart/display");
                });
            } );
            
        } else {
            // console.log(checkCart);
            let newCart = new Cart({
                customerID: req.session.userid,
                cartContents: [{
                productID: 1,
                name: "implant occulaire",
                price: "2000",
                count: 0
            },
            {                      
                productID: 2,
                name: "bras artificiel",
                price: "3800",
                count: 0
            },
            {
                productID: 3,
                name: "jambe artificielle",
                price: "4500",
                count: 0
            }]
        });
            newCart.cartContents[id - 1].count = 1;
            newCart.save();
            res.redirect("/cart/display");
        }
        
        
    });
});

cartRouter.get("/remove/:id", (req, res) =>{

let id = parseInt(req.params.id);

Cart.findOne({customerID: req.session.userid},function(err,obj) {
    obj.cartContents[id - 1].count = obj.cartContents[id - 1].count - 1;
    console.log(obj);
    Cart.updateOne({customerID: req.session.userid}, obj, function(err, result){
        console.log(result);
        res.redirect("/cart/display");
    });
} );

});

module.exports = cartRouter;
