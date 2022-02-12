// const express = require("express");

const mongoose = require("mongoose");
const bcrypt = require ("bcrypt");
const LoginModels = require("../models/loginModels");
const emailvalidator = require("email-validator");

const User = LoginModels;
const regex = new RegExp("^[a-zA-Z]+[0-9]*$");

exports.getLoginPage = (req, res) =>{
    res.render("pages/login",{
        isLoggedIn: req.isLoggedIn,
        loginError: ""        
    });
};

exports.getLogout = (req, res) =>{
    req.session.destroy();
    console.log("session destroyed" + req.session);
    res.redirect("/");
};
exports.postRegisterPage = (req, res) =>{    
    
    if (emailvalidator.validate(req.body.email)){
        if (regex.test(req.body.name)){

            let newUser = new User({
                _id: new mongoose.Types.ObjectId().toHexString(),
                name: req.body.name,
                email: req.body.email,
                psw: bcrypt.hashSync(req.body.psw, bcrypt.genSaltSync(8), null)
            });
            newUser.save();
            let session = req.session;
            session.userid = req.body.name;
            console.log(req.session);
            res.status(200).render("pages/login",{
                loginError: "Successfully registered.",
                isLoggedIn: req.isLoggedIn
            });

        } else {
            res.status(400).render("pages/login",{
                loginError: "Invalid username.",
                isLoggedIn: req.isLoggedIn
            });
        }

    } else {
        res.status(400).render("pages/login",{
            loginError: "Invalid Email.",
            isLoggedIn: req.isLoggedIn
        });
    }
    
};

exports.checkLogin = (req, res) =>{
    
    console.log("dans le checklogin");
    if (regex.test(req.body.name)){
        User.findOne({name : req.body.name},(err, user)=>{
            if (!err){
                if (user != null){
                    if (bcrypt.compareSync(req.body.psw, user.psw)){
                        let session = req.session;
                        session.userid = req.body.name;
                        req.isLoggedIn = true;
                        console.log(req.session);
                        res.render("pages/index",{
                            message: "Successfully logged.",
                            isLoggedIn: req.isLoggedIn
                        });
                    } else {
                        res.status(400).render("pages/login",{
                            loginError: "Invalid credentials.",
                            isLoggedIn: req.isLoggedIn
                        });
                    }
                } else {
                    res.status(400).render("pages/login",{
                        loginError: "User not found.",
                        isLoggedIn: req.isLoggedIn
                    });
                }
            } else {
                res.render("pages/error",{
                    error: `${err.name} ${err.message}`,
                    isLoggedIn: req.isLoggedIn
                });
            }
        });
    } else {
        res.status(400).render("pages/user",{
            loginError: "Invalid credentials.",
            isLoggedIn: req.isLoggedIn
        });
    }
};

