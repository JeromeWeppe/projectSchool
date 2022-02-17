const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    customerID: {
        type: String,
    },
    cartContents: {
        type: [Object]
    }
});

module.exports = mongoose.model("Carts", cartSchema);
