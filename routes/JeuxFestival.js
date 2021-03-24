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
jeuxFestival.get('/:fes_id/allDetails', (req,res) => {
    Jeu.findAll({
        include: [{
            model: TypeJeu,
            attributes: ["typJ_libelle"]
        }, {
            model: Societe,
            attributes: ["soc_nom"]
        },{
              model: SuiviJeu,
            include: [{
                  model: Zone,
                attributes: ["zo_libelle"]
            },{
                  model: Reservation,
                attributes: ["res_recu", "res_envoiDebut"],
                include: [{
                      model: Festival,
                    where: {
                        fes_id: req.sanitize(req.params.fes_id)
                    },
                    attributes: []

                },{
                      model: Societe,
                    attributes:["soc_nom"]
                }]
            }]
            }]
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

module.exports = jeuxFestival