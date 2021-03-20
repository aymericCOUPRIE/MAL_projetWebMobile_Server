const express = require("express")
const jeux = express.Router();
const Jeu = require("../models/Jeu")
const TypeJeu = require('../models/Type_jeu')

//creer un jeu
jeux.post('/add', (req,res) => {
   Jeu.findOne({
       where:{
           j_titre: req.sanitize(req.body.title),
       },

   })
       .then((game) => {
           if(game){
               res.json({ error: "Ce jeux exite déjà" });
           }else{
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
           }

           }
       )
       .catch((err) => {
       res.send("error: " + err);
   });


})

//tous les types de jeu
jeux.get('/allGameType', (req,res) => {
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


module.exports = jeux;
