const express = require("express");
const typeJeu = express.Router();
const TypeJeu = require("../models/Type_jeu");

//tous les types de jeu
typeJeu.get('/all', (req,res) => {
    TypeJeu.findAll({
        order: [["typJ_libelle", "ASC"]],
    })
        .then((types) => {
            if (types) {
                res.json(types);
            } else {
                res.send("Il n'y a pas encore de type de jeux");
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
})
module.exports = typeJeu