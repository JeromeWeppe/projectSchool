const express = require('express');
let loginRouter = express.Router();
const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const LoginModels = require('../models/loginModels');
const emailvalidator = require("email-validator");
// const session = require('express-session');


const User = LoginModels;
const regex = new RegExp('([a-zA-Z]*<+[a-zA-Z]*>*[a-zA-Z]*\/*)');

exports.getLoginPage = (req, res, next) =>{
    res.render('pages/login');
};

exports.getLogout = (req, res) =>{
    req.session.destroy();
    console.log("session destroyed" + req.session);
    res.redirect('/');
}
exports.postRegisterPage = (req, res, next) =>{    

    if(emailvalidator.validate(req.body.email)){
        if(!regex.test(req.body.name)){

            let newUser = new User({
                _id: new mongoose.Types.ObjectId().toHexString(),
                name: req.body.name,
                email: req.body.email,
                psw: bcrypt.hashSync(req.body.psw, bcrypt.genSaltSync(8), null)
            });
            newUser.save();
            session=req.session;
            session.userid = req.body.name;
            console.log(req.session);
            res.status(200).send('You have been registered successfully. <a href='/'>click to get back home</a>');

        }else{
            res.status(400).send('Invalid Username');
        }

    }else{
        res.status(400).send('Invalid Email');
    }
    

    
}

exports.checkLogin = (req, res, next) =>{
    console.log("dans le checklogin");
    if(!regex.test(req.body.name)){
        User.findOne({name : req.body.name},(err, user)=>{
            if(user != null){
                if(bcrypt.compareSync(req.body.psw, user.psw)){
                    session = req.session;
                    session.userid = req.body.name;
                    console.log(req.session);
                    res.send("Successfully logged :) <a href='/'>click to get back home</a> ");
                }else{
                    res.status(400).send("Invalid credentials.");
                }            
            }else{
                res.send("User not found.")
            }
        });
    }else{
        res.status(400).send("Invalid credentials.");
    }
}

