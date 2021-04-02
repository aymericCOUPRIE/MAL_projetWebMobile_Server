//import {getAllRoleFest} from "../utils/RoleFestival";
//import {getAllSuiviExp} from "../utils/SuiviExposant";

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
 * Method which create a new festival and therefore :
 * an undefined zone,
 * all the role_festival for the existed societe,
 * the suivi_exposant for the existed societe
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
            }
            Festival.create(festivalData)
                .then((fes) => {

                        //res.json({success: "Festival créé avec succès !"})
                        // Zone creation

                        Localisation.create(
                            {
                                loc_prixTable: 100,
                                loc_prixM2: 25,
                                loc_libelle: "Localisation default",
                                fes_id: fes.fes_id
                            }
                        )

                        const zoneData = {
                            zo_libelle: "Zone - Zone indéfinie",
                            fes_id: fes.fes_id
                        }


                        Zone.create(zoneData).then((response) => {
                            Festival.findAll({
                                order: [["fes_date", "DESC"]],
                                where: {
                                    fes_date: {
                                        [Op.lte]: Sequelize.literal('NOW()'), //le festival précédent
                                    }
                                },
                                limit: 1,
                                include: [
                                    {
                                        model: RoleFestival
                                    }
                                ]
                            }).then((roleFestList) => {
                                roleFestList[0].dataValues.role_festivals.forEach((e) => {
                                    RoleFestival.create(
                                        {
                                            rolF_estExposant: e.dataValues.rolF_estExposant,
                                            rolF_estEditeur: e.dataValues.rolF_estEditeur,
                                            soc_id: e.dataValues.soc_id,
                                            fes_id: fes.fes_id
                                        }
                                    )
                                })


                                Festival.findAll({
                                    order: [["fes_date", "DESC"]],
                                    where: {
                                        fes_date: {
                                            [Op.lte]: Sequelize.literal('NOW()'),
                                        }
                                    },
                                    limit: 1,
                                    include: [{
                                        model: SuiviExposant
                                    }]
                                }).then((suiviExpList) => {
                                    console.log("RESULT SE", suiviExpList)

                                    suiviExpList[0].dataValues.suivi_exposants.forEach(e => {
                                        SuiviExposant.create(
                                            {
                                                suivE_benevole: 0,
                                                suivE_nbBenevoles: 0,
                                                suivE_deplacement: 0,
                                                suivE_commentaire: "",
                                                suivD_id: 8,
                                                soc_id: e.dataValues.soc_id,
                                                fes_id: fes.fes_id
                                            }
                                        )
                                    })
                                })
                            })
                        })
                    }
                )
                .catch((err) => {
                    res.json("error: " + err);
                })
        } else {
            res.json({error: "Un festival existe déjà à cette date."});
        }
    })
})
;

festivals.get("/affichageRole/:fes_id", (req, res) => {
    Festival.findAll({
            where: {
                fes_id: req.sanitize(req.params.fes_id),
            },
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
        console.log("ROLES FESTIVALS", result)
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


//toutes les zones d'un festival avec les jeux qu'il y a dedans
festivals.get("/closest/gamesByZone", (req, res) => {
    Festival.findOne({
        attributes: ["fes_date", "fes_id"],
        order: [["fes_date", "ASC"]],
        where: {
            fes_date: {
                [Op.gte]: Sequelize.literal('NOW()'),
            }
        },
        limit: 1,
        include: [{
            model: Zone,
            include: [{
                model: SuiviJeu,
                attributes: ["j_id", "zo_id"],
                include: [{
                    model: Jeu,
                    include: [{
                        model: TypeJeu
                    },
                        {
                            model: Societe,
                            attributes: ["soc_nom"],
                        }]
                }]
            }]
        }]
    }).then((result) => {

        if (result) {
            res.json(result);
        } else {
            res.send("C'est le néaaaaan");
        }
    })
        .catch((err) => {
            res.send("error: " + err);
        });
})

//liste jeux festival le plus proche par éditeur
festivals.get("/allInfosNextFestival", ((req, res) => {


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

festivals.get("/affichageEditeur/:fes_id", (req, res) => {

    Festival.findAll({
        where: {
            fes_id: req.sanitize(req.params.fes_id)
        },
        required: true,
        include: [
            {
                model: Societe,
                through: {
                    where: {
                        rolF_estEditeur: 1
                    }
                },
                include: [
                    {
                        model: Jeu,
                    }
                ]
            }
        ]
    }).then((result) => {
        if (result) {
            res.json(result)
        } else {
            res.send({message: "ERROR"})
        }
    })

})


festivals.get("/affichageExposant/:fes_id", (req, res) => {
    Festival.findAll({
            where: {
                fes_id: req.sanitize(req.params.fes_id)
            },
            include: [
                {
                    model: Societe,
                    through: {
                        where: {
                            rolF_estExposant: 1
                        }
                    },
                    include: [
                        {
                            model: SuiviExposant,
                            where: {
                                fes_id: req.sanitize(req.params.fes_id)
                            }
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
            console.log("EXPOSANTS", result)
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

/*
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
*/


/* request for mobile
    to get the list  of the game exhibited at the current festival
 */
festivals.get("/gameByEditor", ((req, res) => {
    Festival.findOne({
        attributes: ["fes_date", "fes_id"],
        order: [["fes_date", "ASC"]],
        where: {
            fes_date: {
                [Op.gte]: Sequelize.literal('NOW()'),
            }
        },
        limit: 1
    }).then((festi) => {
        if (festi) {
            db.sequelize
                .query(
                    "SELECT s.soc_nom as nomEditeur, j.*, tj.typJ_libelle as type_jeu FROM festival AS fes INNER JOIN role_festival rf ON rf.fes_id = fes.fes_id INNER JOIN reservation resa ON resa.fes_id = fes.fes_id AND resa.soc_id = rf.soc_id INNER JOIN suivi_jeu suivi ON suivi.res_id = resa.res_id INNER JOIN jeu j ON j.j_id = suivi.j_id INNER JOIN type_jeu tj ON j.typJ_id = tj.typJ_id INNER JOIN societe s ON j.soc_id = s.soc_id WHERE fes.fes_id = " + festi.dataValues.fes_id + " AND rf.rolF_estEditeur = 1 ORDER BY s.soc_id",
                    {
                        type: QueryTypes.SELECT,
                        raw: false
                    }
                )
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
        } else {
            res.send("Il y a rien pour ce festival..");
        }
    })
        .catch((err) => {
            res.send("error: " + err);
        });

}))

/*
// gameByEditor with sequelize
festivals.get("/gameByEditor", ((req, res) => {
    Festival.findOne({
        attributes: ["fes_date", "fes_id"],
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
                //attributes: ["soc_id", "soc_nom"],
                required: true,
                through: {
                    where: {
                        fes_id: true
                    }
                    //attributes: ["soc_id", "fes_id"],
                },
                include: [
                    {
                        model: Reservation,
                        attributes: ["soc_id", "fes_id"],
                        include: [
                            {
                                model: SuiviJeu,
                                attributes: ["j_id", "res_id",],

                                include: [
                                    {
                                        model: Jeu,
                                        include: [
                                            {
                                                model: Societe,
                                                attributes: ["soc_id"]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }).then((list) => {
        if (list) {
            res.json(list)
        } else {
            res.send({message: "error"})
        }
    })
}))
*/


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

