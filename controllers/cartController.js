const cartModels = require("../models/cartDbModels");
const Cart = cartModels;

exports.getCartPage = (req, res) => {
    Cart.findOne({customerID: req.session.userid}, function (err, docs) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).render("pages/cart",{
            isLoggedIn: req.isLoggedIn,
            cart: docs
        });
    });
};

exports.addItem = (req, res) =>{
    let checkCart;
    let id = parseInt(req.params.id);
    Cart.count({customerID: req.session.userid}, function (err, count){
        if (err) {
            console.log(err);
            throw err;
        }
        if (count > 0){
            checkCart = true;
        } else {
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
            
            let newCart = new Cart({
                customerID: req.session.userid,
                cartContents: [{
                productID: 1,
                name: "implant occulaire",
                price: "20000",
                count: 0
            },
            {                      
                productID: 2,
                name: "bras artificiel",
                price: "38000",
                count: 0
            },
            {
                productID: 3,
                name: "jambe artificielle",
                price: "45000",
                count: 0
            }]
        });
            newCart.cartContents[id - 1].count = 1;
            newCart.save();
            res.redirect("/cart/display");
        }
        
        
    });
};

exports.removeItem = (req, res) =>{

    let id = parseInt(req.params.id);
    
    Cart.findOne({customerID: req.session.userid},function(err,obj) {
        if (err) {
            console.log(err);
            throw err;
        }
        obj.cartContents[id - 1].count = obj.cartContents[id - 1].count - 1;
        console.log(obj);
        Cart.updateOne({customerID: req.session.userid}, obj, function(err, result){
            console.log(result);
            res.redirect("/cart/display");
        });
    } );
};