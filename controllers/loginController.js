const express = require('express');
let loginRouter = express.Router();
const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const LoginModels = require('../models/loginModels');

const User = LoginModels;
const saltRounds = 10;
let hashPsw = "";

exports.getLoginPage = (req, res, next) =>{
    res.render('pages/login');
};

exports.postRegisterPage = (req, res, next) =>{
    console.log("dans le register");
    console.log(req.body.register);
    let newUser = new User({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: req.body.name,
        email: req.body.email,
        psw: bcrypt.hashSync(req.body.psw, bcrypt.genSaltSync(8), null)
    });
    newUser.save();
    session=req.session;
    
    // res.render('pages/index');
    res.status(200).send('You have been registered successfully.' + session.cookie);
}

exports.checkLogin = (req, res, next) =>{
    console.log("dans le checklogin");
    
    User.findOne({name : req.body.name},(err, user)=>{
        if(user != null){
            if(bcrypt.compareSync(req.body.psw, user.psw)){
                res.send("Successfully logged :)");
            }else{
                res.send("Wrong credentials.");
            }
                
            
        }
    });
    res.send();
}

