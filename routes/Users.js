const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken"); //pour autentification
const bcrypt = require("bcrypt");
const User = require("../models/User");
const db = require("../database/db.js");
const sequelize = require("sequelize");
users.use(cors());

//Connexion
users.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.sanitize(req.body.email),
        },
    })
        .then((user) => {
            if (!user) {
                res.json({ error: "Email incorrect" });
            } else {
                if (bcrypt.compareSync(req.sanitize(req.body.password), user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
                    });
                    res.json({ token: token, user: user });
                } else {
                    res.json({ error: "Mot de passe incorrect" });
                }
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
});