const express = require("express");
const users = express.Router();
const jwt = require("jsonwebtoken"); //pour autentification
const bcrypt = require("bcrypt");
const User = require("../models/User");


//Connexion
users.post("/login", (req, res) => {
    User.findOne({
        where: {
            user_email: req.sanitize(req.body.email),
        },
    }).then((user) => {
        if (!user) {
            res.json({error: "Email incorrect"});
        } else {
            if (bcrypt.compareSync(req.sanitize(req.body.password), user.user_motDePasse)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: "1d",
                });
                res.json({token: token, user: user.user_email});
            } else {
                res.json({error: "Mot de passe incorrect"});
            }
        }
    }).catch((err) => {
        res.send("error: " + err);
    });
});


module.exports = users
