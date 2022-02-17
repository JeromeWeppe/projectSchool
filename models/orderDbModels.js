const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerID: {
        type: { type: String, ref: "User" },
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


module.exports = mongoose.model("Orders", orderSchema);
//feature non développée par manque de temps (covid, travail en entreprise prenant, pas de poste de dev en entreprise donc manque d'experience
// et peu de temps en général pour faire le projet)
