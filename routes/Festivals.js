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
const SuiviExposant = require('../models/Suivi_exposant')
const Contact = require('../models/Contact')
const Espace = require('../models/Espace')
const Localisation = require('../models/Localisation')
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

festivals.get("/affichageRole/:fes_id", (req, res) => {
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
                    through: {
                        attributes: ["rolF_estExposant", "rolF_estEditeur"]
                    }

                }

            ]
        }
    ).then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err)
    })
})
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
    }).then((liste) => {
        if (liste) {
            res.json(liste);
        } else {
            res.send("Il y a rien pour ce festival..");
        }
    }).catch((err) => {
        res.send("error: " + err);
    });
}))

festivals.get("/affichageExposant/:fes_id", (req, res) => {

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
                    through: {
                        attributes: [],
                        where: {
                            rolF_estExposant: true,
                        }
                    },
                    include: [
                        {
                            model: SuiviExposant
                        },
                        {
                            model: Reservation,
                            include: [
                                {
                                    model: Espace,
                                    include: [
                                        {
                                            model: Localisation
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: Contact,
                            limite: 3
                        }
                    ]
                }
            ]
        }
    ).then((result) => {
        if (result) {
            console.log("RESULT", result)
            res.json(result)
        } else {
            res.send({message: "error"})
        }
    })
})

// to update the date of the festival
festivals.put("/updateDate", (req, res) => {
    Festival.update(
        {
            fes_date: req.sanitize(req.body.new_date)
        },
        {
            where: {
                fes_id: req.sanitize(req.body.fes_id)
            }
        }
    ).then((response) => {
        res.send({message: 'La date du festival a été modifiée.'})
    })
})

// to update the number of tables of the festival
festivals.put("/updateNbTables", (req, res) => {
    Festival.update(
        {
            fes_nbTables: req.sanitize(req.body.new_nbTables)
        },
        {
            where: {
                fes_id: req.sanitize(req.body.fes_id)
            }
        }
    ).then((response) => {
        res.send({message: 'Le nombre de tables pour le festival a été modifié.'})
    })
})


//TODO changer la route  /:fes_id/details
//festival by id
festivals.get("/:fes_id", (req, res) => {
    Festival.findOne(
        {
            where: {
                fes_id: req.sanitize(req.params.fes_id),
            },
        }
    ).then((festival) => {
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

