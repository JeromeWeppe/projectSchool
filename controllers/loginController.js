const mongoose = require("mongoose");
const bcrypt = require ("bcrypt");
const userModels = require("../models/userDbModels");
const emailvalidator = require("email-validator");

const User = userModels;
const wordRegex = new RegExp("^[a-zA-Z0-9_ ]*$");
const numbRegex = new RegExp("^[0-9]+$");
const pswRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");

exports.getLoginPage = (req, res) =>{
    res.render("pages/login",{
        isLoggedIn: req.isLoggedIn,
        loginError: ""
    });
};

exports.getLogout = (req, res) =>{
    req.session.destroy();
    res.redirect("/");
};

exports.postRegisterPage = (req, res) =>{

    if (emailvalidator.validate(req.body.email) ){

        User.exists({email: req.body.email}, (err,id)=>{

            if (err) {
                console.log(err);
                throw err;
            }

            if (id == null){
                if (wordRegex.test(req.body.name) 
                            && numbRegex.test(req.body.numStreet) 
                            && wordRegex.test(req.body.street) 
                            && wordRegex.test(req.body.city) 
                            && numbRegex.test(req.body.postalCode) 
                            && pswRegex.test(req.body.psw)
                            ){
                                let newUser = new User({
                                    _id: new mongoose.Types.ObjectId().toHexString(),
                                    name: req.body.name,
                                    email: req.body.email,
                                    psw: bcrypt.hashSync(req.body.psw, bcrypt.genSaltSync(8), null),
                                    address:{
                                        numStreet: req.body.numStreet,
                                        street: req.body.street,
                                        city: req.body.city,
                                        postalCode: req.body.postalCode
                                    }
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
                                    loginError: "champs incorrects",
                                    isLoggedIn: req.isLoggedIn
                                });
                            }
            } else {
                res.status(400).render("pages/login",{
                    loginError: "Nom non valide ou déjà existant",
                    isLoggedIn: req.isLoggedIn
                });
            }
            
        });
        console.log(req.session);
    } else {
        res.status(400).render("pages/login",{
            loginError: "Email non valide ou déjà existant",
            isLoggedIn: req.isLoggedIn
        });
    }
    
};

exports.checkLogin = (req, res) =>{

    if (wordRegex.test(req.body.name) && pswRegex.test(req.body.psw)){

        User.findOne({name : req.body.name},(err, user)=>{

            if (!err){

                if (user != null){

                    if (bcrypt.compareSync(req.body.psw, user.psw)){

                        let session = req.session;
                        session.userid = req.body.name;
                        req.isLoggedIn = true;
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
                    error: "une erreur s'est produite",
                    isLoggedIn: req.isLoggedIn
                });
            }
        });
    } else {
        res.status(400).render("pages/login",{
            loginError: "Invalid credentials.",
            isLoggedIn: req.isLoggedIn
        });
    }
};

exports.getProfil = (req,res) => {

    User.findOne({name: req.session.userid}, function(err, docs) {

        if (err) {
            console.log(err);
            throw err;
        }

        res.status(200).render("pages/profil",{
            isLoggedIn: req.isLoggedIn,
            profilData: docs,
            message:""
      });
    });
};

exports.changePsw = (req,res) => {

    User.findOne({name : req.session.userid},(err, user)=>{

        if (err) {
            console.log(err);
            throw err;
        }

        if (bcrypt.compareSync(req.body.oldPsw, user.psw )){

            if (req.body.newPsw === req.body.newPsw2){

                user.psw = bcrypt.hashSync(req.body.newPsw, bcrypt.genSaltSync(8), null);
                console.log(user);

                User.updateOne({name: req.session.userid}, user, function(err, result){

                    console.log(result);
                    res.status(200).render("pages/profil",{
                        message: "mot de passe changé avec succès",
                        isLoggedIn: req.isLoggedIn,
                        profilData: user
                    });

                });

            } else {
                res.render("pages/profil",{
                    message: "erreur : les nouveaux mots de passes ne correspondent pas",
                    isLoggedIn: req.isLoggedIn,
                    profilData: user
                });
            }
        } else {
            res.render("pages/profil",{
                message: "erreur : mauvais mot de passe",
                isLoggedIn: req.isLoggedIn,
                profilData: user
            });
        }
    });
    
};