// const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    psw: String
});
// get /cart/list = avoir tous les articles du panier
// put 
// table cartItem{id
// quantité
// compte}
module.exports = mongoose.model("Users", userSchema);
