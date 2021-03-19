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

//changement mdp (put pour modifier)
users.post("/update-password/:email", (req, res) => {
    console.log(req.params)
    User.findOne({
        where: {
            user_email: req.sanitize(req.params.email),
        },
    })
        .then((user) => {
                if (bcrypt.compareSync(req.sanitize(req.body.olderPassword), user.user_motDePasse)) {

                            const hash = bcrypt.hashSync(req.body.newPassword, 10);

                            User.update(
                                { user_motDePasse: hash },
                                { where: { user_email: req.sanitize(req.params.email) } }
                            )
                                .then(() => {
                                    res.json({ success: "Mot de passe modifié !" });
                                })
                                .catch((err) => {
                                    res.json({error: err + "llo"});
                                });

                    } else {
                        res.json({ error: "Mot de passe incorrect!" });
                }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
});

//inscription
users.post("/register", (req, res) => {
    User.findOne({
        where: {
            user_email: req.sanitize(req.body.email),
        },
    })
        .then((user) =>{
            if(!user){
                const userData = {
                    user_email : req.sanitize(req.body.email),
                    user_motDePasse : req.sanitize(req.body.password),
                    user_estAdmin : req.sanitize(req.body.estAdmin),
                };

                const hash = bcrypt.hashSync(userData.user_motDePasse, 10);

                userData.user_motDePasse = hash;

                console.log("MDP HAS SA MERE", userData.user_password)

                User.create(userData) //equivalent de INSERT INTO en sql
                    .then((user) => {
                   
                        res.json({ success: "Compte crée avec succès !" });
                    })
            }else{
                res.json({error: "Cette adresse mail est déjà utilisé"});
            }
        })
});

/*
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

//vérifier si l'user est connecté
users.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send({auth: true, message: "Auth succeeded"})
})
*/


module.exports = users
