const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    customerID: {
        type: { type: String, ref: "User" },
        required: true
    },
    cartContents: {
        type: [Object]
    }
});

module.exports = mongoose.model("Carts", cartSchema);
