const express = require("express")
const jeux = express.Router();
const Jeu = require("../models/Jeu")

//creer un jeu
jeux.post('/add', (req,res) => {
   const gameData = {
       j_titre: req.sanitize(req.body.title),
       j_ageMin: req.sanitize(req.body.minAge),
        j_duree: req.sanitize(req.body.duration),
        j_nbMaxJoueurs: req.sanitize(req.body.maxNumPlayers),
        j_nbMinJoueurs:req.sanitize(req.body.minNumPlayers),
        j_lienNotice: req.sanitize(req.body.rulesLink),
        soc_id: req.sanitize(req.body.companyId),
        typJ_id: req.sanitize(req.body.gameTypeId),
   }
    Jeu.create(gameData)
        .then( (game) => {
            res.json({success: "Jeu crée avec succès!"})
        })
        .catch((err) => {
            res.json("error: " + err);
        });
})
module.exports = jeux;
