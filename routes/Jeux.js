const express = require("express")
const jeux = express.Router();
const db = require('../database/db')
const sequelize = require("sequelize");
const {QueryTypes} = require("sequelize");
const Jeu = require("../models/Jeu")
const TypeJeu = require('../models/Type_jeu')
const Societe = require("../models/Societe")

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


//touts les jeux avec leurs infos
jeux.get('/allDetails', (req,res) => {
    db.sequelize
        .query(
            "SELECT j.*,tj.typJ_libelle as typeJeu, soc.soc_nom as nom_editeur FROM jeu as j LEFT JOIN type_jeu as tj ON j.typJ_id = tj.typJ_id LEFT JOIN societe as soc ON j.soc_id = soc.soc_id",
            {
                type: QueryTypes.SELECT,
                raw: false
            }
        )
        .then((jeux) => {

            if (jeux) {
                res.json(jeux);
            } else {
                res.send("Il n'y a pas de jeux");
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
})

//update duree
jeux.post("/:j_id/update-duree", (req, res) => {
    Jeu.findOne({
        where:{
            j_id: req.sanitize(req.params.j_id)
        },
    })
        .then((game) => {
            if(!game){
                res.json({error: "Ce jeu n'existe pas"})
            }
            else{
                Jeu.update(
                    { j_duree: req.sanitize(req.body.duree)},
                     { where : {  j_id: req.sanitize(req.params.j_id)} }
                ).then(() => {
                    res.json({ success: "Durée modifiée !" });
                })
                    .catch((err) => {
                        res.json({error: err});
                    });
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
})

//update nb joueurs max
jeux.post("/:j_id/update-nbjMax", (req, res) => {
    Jeu.findOne({
        where:{
            j_id: req.sanitize(req.params.j_id)
        },
    })
        .then((game) => {
            if(!game){
                res.json({error: "Ce jeu n'existe pas"})
            }
            else{
                Jeu.update(
                    { j_nbMaxJoueurs: req.sanitize(req.body.nbjMax)},
                    { where : {  j_id: req.sanitize(req.params.j_id)} }
                ).then(() => {
                    res.json({ success: "nb joueurs max modifié !" });
                })
                    .catch((err) => {
                        res.json({error: err});
                    });
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
})

//update nb joueurs min
jeux.post("/:j_id/update-nbjMin", (req, res) => {
    Jeu.findOne({
        where:{
            j_id: req.sanitize(req.params.j_id)
        },
    })
        .then((game) => {
            if(!game){
                res.json({error: "Ce jeu n'existe pas"})
            }
            else{
                Jeu.update(
                    { j_nbMinJoueurs: req.sanitize(req.body.nbjMin)},
                    { where : {  j_id: req.sanitize(req.params.j_id)} }
                ).then(() => {
                    res.json({ success: "nb joueurs min modifié !" });
                })
                    .catch((err) => {
                        res.json({error: err});
                    });
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
})

//update age min
jeux.post("/:j_id/update-ageMin", (req, res) => {
    Jeu.findOne({
        where:{
            j_id: req.sanitize(req.params.j_id)
        },
    })
        .then((game) => {
            if(!game){
                res.json({error: "Ce jeu n'existe pas"})
            }
            else{
                Jeu.update(
                    { j_ageMin: req.sanitize(req.body.ageMin)},
                    { where : {  j_id: req.sanitize(req.params.j_id)} }
                ).then(() => {
                    res.json({ success: " age min modifié !" });
                })
                    .catch((err) => {
                        res.json({error: err});
                    });
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
})


//update lien notice
jeux.post("/:j_id/update-lienNotice", (req, res) => {
    Jeu.findOne({
        where:{
            j_id: req.sanitize(req.params.j_id)
        },
    })
        .then((game) => {
            if(!game){
                res.json({error: "Ce jeu n'existe pas"})
            }
            else{
                Jeu.update(
                    { j_lienNotice: req.sanitize(req.body.lienNotice)},
                    { where : {  j_id: req.sanitize(req.params.j_id)} }
                ).then(() => {
                    res.json({ success: "Lien notice min modifié !" });
                })
                    .catch((err) => {
                        res.json({error: err});
                    });
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
})

//update type jeu
jeux.post("/:j_id/update-typeId", (req, res) => {
    Jeu.findOne({
        where:{
            j_id: req.sanitize(req.params.j_id)
        },
    })
        .then((game) => {
            if(!game){
                res.json({error: "Ce jeu n'existe pas"})
            }
            else{
                Jeu.update(
                    { typJ_id: req.sanitize(req.body.typeId)},
                    { where : {  j_id: req.sanitize(req.params.j_id)} }
                ).then(() => {
                    res.json({ success: " Type modifié !" });
                })
                    .catch((err) => {
                        res.json({error: err});
                    });
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
})

//update editeur
jeux.post("/:j_id/update-editeurId", (req, res) => {
    Jeu.findOne({
        where:{
            j_id: req.sanitize(req.params.j_id)
        },
    })
        .then((game) => {
            if(!game){
                res.json({error: "Ce jeu n'existe pas"})
            }
            else{
                Jeu.update(
                    { soc_id: req.sanitize(req.body.editeurId)},
                    { where : {  j_id: req.sanitize(req.params.j_id)} }
                ).then(() => {
                    res.json({ success: " Éditeur modifié !" });
                })
                    .catch((err) => {
                        res.json({error: err});
                    });
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
})

module.exports = jeux;
