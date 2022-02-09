const express = require('express');
let loginRouter = express.Router();
const mongoose = require('mongoose');

const loginController = require('../controllers/loginController');

loginRouter.get('/', loginController.getLoginPage);

loginRouter.post('/register',loginController.postRegisterPage);

loginRouter.post('/login',loginController.checkLogin);

module.exports = loginRouter;
