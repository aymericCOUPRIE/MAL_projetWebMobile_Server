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
                    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
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


const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        res.send("There is no token")
    } else {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.send({auth: false, message: "Auth failed"})
            } else {
                req.user_email = decoded.user_email
                next()
            }
        })
    }
}

users.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send({auth: true, message: "Auth succeeded"})
})


module.exports = users
