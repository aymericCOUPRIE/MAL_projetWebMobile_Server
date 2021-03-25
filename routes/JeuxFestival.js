const Sequelize = require('sequelize')
const express = require("express")
const jeuxFestival = express.Router();

const Jeu = require("../models/Jeu")
const TypeJeu = require('../models/Type_jeu')
const Societe = require("../models/Societe")
const Zone = require("../models/Zone")
const Reservation = require("../models/Reservation")
const SuiviJeu = require("../models/Suivi_jeu")
const Festival = require("../models/Festival")

//récupérer les infos des jeux d'un festival
jeuxFestival.get('/:fes_id/allDetails', (req, res) => {
    SuiviJeu.findAll({
        include: [
            {
                model: Zone,
                attributes: ["zo_libelle"]
            },
            {
                model: Jeu,
                include: [
                    {
                        model: TypeJeu,
                        attributes: ["typJ_libelle"]
                    },
                    {
                        model: Societe, //editeur
                        attributes: ["soc_nom"]
                    }
                ]
            },
            {
                model: Reservation,
                attributes: ["res_recu", "res_envoiDebut"],
                include: [
                    {
                        model: Societe, //exposant
                        attributes: ["soc_nom"]
                    },
                    {
                        model: Festival,
                        attributes: ["fes_id"],
                        where: {
                            fes_id: req.sanitize(req.params.fes_id)
                        }
                    }
                ]
            }

        ]
    })
        .then((jeux) => {
            if (jeux) {
                res.json(jeux);
            } else {
                res.send("Il n'y a pas de jeux pour ce festival");
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
})

//changer prototype d'un suivi jeu
jeuxFestival.post('/update-prototype/:suivJ_id', (req, res) => {
    SuiviJeu.findOne({
        where: {
            suivJ_id: req.sanitize(req.params.suivJ_id)
        },
    })
        .then((suivi) => {
            if (!suivi) {
                res.json({error: "Ce suivi n'existe pas"})
            } else {
                SuiviJeu.update({
                    suivJ_prototype: req.body.suivJ_prototype,
                    suivJ_dateSaisie: Sequelize.literal('NOW()'),
                },{
                    where: {
                        suivJ_id: req.sanitize(req.params.suivJ_id)
                    }
                } ).then(()=>{
                    res.json({success: "Prototype changée!"})
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

//changer la zone
jeuxFestival.post('/update-zone/:suivJ_id', (req, res) => {
    SuiviJeu.findOne({
        where: {
            suivJ_id: req.sanitize(req.params.suivJ_id)
        },
    })
        .then((suivi) => {
            if (!suivi) {
                res.json({error: "Ce suivi n'existe pas"})
            } else {
                SuiviJeu.update(
                    {
                        zo_id: req.sanitize(req.body.zo_id),
                        suivJ_dateSaisie: Sequelize.literal('NOW()'),
                    },
                    {
                        where: {
                            suivJ_id: req.sanitize(req.params.suivJ_id)
                        }
                    }
                ).then(()=>{
                    res.json({success: "zone changée!"})
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

module.exports = jeuxFestival