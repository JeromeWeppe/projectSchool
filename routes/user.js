const express = require("express");
let loginRouter = express.Router();

const loginController = require("../controllers/loginController");

loginRouter.get("/", loginController.getLoginPage);

loginRouter.post("/register",loginController.postRegisterPage);

loginRouter.post("/login",loginController.checkLogin);

loginRouter.get("/profil", loginController.getProfil);

loginRouter.post("/profil", loginController.changePsw);

loginRouter.get("/logout", loginController.getLogout);

module.exports = loginRouter;
