const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    psw: String
});

const cartSchema = new mongoose.Schema({
    customerID: {
        type: String,
        required: true
    },
    cartContents: {
        type: [Object]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const orderSchema = new mongoose.Schema({
    customerID: {
        type: String,
        required: true
    },
    cartContents: {
        type: [Object]
    },
    date: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number
    }
});
// get /cart/list = avoir tous les articles du panier
// put 
// table cartItem{id
// quantité
// compte}
module.exports = mongoose.model("Users", userSchema);
module.exports = mongoose.model("Cart", cartSchema);
module.exports = mongoose.model("Orders", orderSchema);