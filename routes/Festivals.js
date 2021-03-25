const Sequelize = require('sequelize')
const db = require('../database/db')
const {QueryTypes} = require("sequelize");
const express = require("express");
const festivals = express.Router();

const Festival = require("../models/Festival");
const Jeu = require("../models/Jeu")
const TypeJeu = require('../models/Type_jeu')
const Societe = require("../models/Societe")
const RoleFestival = require("../models/Role_festival")
const Reservation = require("../models/Reservation")
const SuiviJeu = require("../models/Suivi_jeu")
const Zone = require('../models/Zone')

const {Op} = require('sequelize')


/**
 * Method which create a new festival
 */
festivals.post('/add', (req, res) => {
    Festival.findOne({
        where: {
            fes_date: req.sanitize(req.body.fes_date),
        },
    }).then((festival) => {
        if (!festival) {
            const festivalData = {
                fes_date: req.sanitize(req.body.fes_date),
                fes_nbTables: req.sanitize(req.body.fes_nbTables)
            }
            Festival.create(festivalData)
                .then((fes) => {
                    res.json({success: "Festival créé avec succès !"})
                })
                .catch((err) => {
                    res.json("error: " + err);
                })
        } else {
            res.json({error: "Un festival existe déjà à cette date."});
        }
    })
});


/**
 * Method which get all the festivals order from the most recent to the older
 */
festivals.get("/allDetails", (req, res) => {
    Festival.findAll({
        order: [["fes_date", "DESC"]]
    })
        .then((festivals) => {
            if (!festivals) {
                res.json({error: "Il n'y a aucun festival"});
            } else {
                res.json({allFestivals: festivals});
                //res.send({res: festivals});
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
});


//prochain festival
festivals.get("/closest", (req, res) => {
    Festival.findAll({
        order: [["fes_date", "ASC"]],
        where: {
            fes_date: {
                [Op.gte]: Sequelize.literal('NOW()'),
            }
        },
        limit: 1,
    }).then((festival) => {
        if (!festival) {
            res.json({error: "Aucun festival n'existe"});
        } else {
            res.json({closestFestival: festival});
        }
    }).catch((err) => {
        res.send("error: " + err);
    });
});


//liste jeux festival le plus proche par éditeur
festivals.get("/gameByEditor", ((req, res) => {


    Festival.findAll({
        attributes: ["fes_date"],
        order: [["fes_date", "ASC"]],
        where: {
            fes_date: {
                [Op.gte]: Sequelize.literal('NOW()'),
            }
        },
        limit: 1,
        include: [
            {
                model: Societe,
                attributes: ["soc_id", "soc_nom"],
                through: {
                    attributes: [],
                    where: {
                        rolF_estExposant: true,
                    }
                },
                include: [
                    {
                        model: Reservation,
                        attributes: ["res_id"],
                        include: [
                            {
                                model: SuiviJeu,
                                attributes: ["suivJ_id"],
                                include: [
                                    {
                                        model: Jeu,
                                        include: [
                                            {
                                                model: TypeJeu,
                                                attributes: ["typJ_libelle"],
                                            },
                                            {
                                                model: Societe,
                                                attributes: [
                                                    //Renommer soc_nom en "nomEditeur"
                                                    ["soc_nom", "nomEditeur"]
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        model: Zone,
                                        attributes: ["zo_libelle"],

                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    })
        /*
        db.sequelize
            .query(
                "SELECT societe.soc_nom as 'nomEditeur', jeu.j_id FROM festival AS fes INNER JOIN role_festival AS role ON role.fes_id = fes.fes_id INNER JOIN reservation AS resa ON resa.fes_id = fes.fes_id AND resa.soc_id = role.soc_id INNER JOIN suivi_jeu AS suivi ON suivi.res_id = resa.res_id INNER JOIN jeu ON jeu.j_id = suivi.j_id INNER JOIN societe ON jeu.soc_id = societe.soc_id WHERE fes_date = '2021-03-21' AND role.rolF_estEditeur = 1 ORDER BY societe.soc_id",

*/

        .then((liste) => {

            if (liste) {
                res.json(liste);
            } else {
                res.send("Il y a rien pour ce festival..");
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
}))

// to update the date of the festival
festivals.put("/updateDate", (req, res) => {
    Festival.update(
        {fes_date: req.sanitize(req.body.new_date)},
        {where: {fes_id: req.sanitize(req.body.fes_id)}}
    ).then((response) => {
        res.send({message: 'La date du festival a été modifiée.'})
    })
})

// to update the number of tables of the festival
festivals.put("/updateNbTables", (req, res) => {
    Festival.update(
        {fes_nbTables: req.sanitize(req.body.new_nbTables)},
        {where: {fes_id: req.sanitize(req.body.fes_id)}}
    ).then((response) => {
        res.send({message: 'Le nombre de tables pour le festival a été modifié.'})
    })
})


//TODO changer la route  /:fes_id/details
//festival by id
festivals.get("/:fes_id", (req, res) => {
    Festival.findOne({
        where: {
            fes_id: req.sanitize(req.params.fes_id),
        },
    })
        .then((festival) => {
            if (!festival) {
                res.json({error: "Aucun festival ne correspond à cet identifiant"});
            } else {
                res.json({festival: festival});
            }
        }).catch((err) => {
        res.send("error: " + err);
    });
})


module.exports = festivals;

