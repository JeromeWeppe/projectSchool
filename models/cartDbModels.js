const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    customerID: {
        type: String,
        // required: "true"
    },
    cartContents: {
        type: [Object]
    }
});

module.exports = mongoose.model("Carts", cartSchema);
