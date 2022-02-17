const express = require("express");
let cartRouter = express.Router();
const cartController = require("../controllers/cartController");

cartRouter.get("/display", cartController.getCartPage);

cartRouter.get("/add/:id", cartController.addItem);

cartRouter.get("/remove/:id", cartController.removeItem);

module.exports = cartRouter;
