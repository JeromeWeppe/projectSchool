const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerID: {
        type: { type: String, ref: "User" },
        required: true
    },
    orderContents: {
        type: Array
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

module.exports = mongoose.model("Orders", orderSchema);
