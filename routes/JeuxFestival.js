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
const {Op} = require("sequelize");

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
                attributes: ["res_envoiDebut"],
                include: [
                    {
                        model: Societe, //exposant
                        attributes: ["soc_nom", "soc_id"]
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
    }).then((jeux) => {
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


//récupérer les infos des jeux d'un festival
jeuxFestival.get('/allGames', (req, res) => {
    Festival.findAll({
        attributes: ["fes_id"],
        order: [["fes_date", "ASC"]],
        where: {
            fes_date: {
                [Op.gte]: Sequelize.literal('NOW()'),
            }
        },
        limit: 1,
    }).then((result) => {
        Reservation.findAll(
            {
                attributes: ["fes_id", "res_id"],
                where: {fes_id: result[0].dataValues.fes_id},
                include: [
                    {
                        model: SuiviJeu,
                        attributes: ["suivJ_id"],
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
                            }
                        ]
                    }
                ]
            }
        ).then((jeux) => {
            if (jeux) {
                res.json(jeux);
            } else {
                res.send("Il n'y a pas de jeux pour ce festival");
            }
        }).catch((err) => {
            res.send("error: " + err);
        });

    }).catch((err) => {
        console.log(err)
    })


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
                    suivJ_prototype: req.body.suivJ_prototype, //j'utilize pas sanitize sinon il transforme mon booléen en undefine..
                    suivJ_dateSaisie: Sequelize.literal('NOW()'),
                }, {
                    where: {
                        suivJ_id: req.sanitize(req.params.suivJ_id)
                    }
                }).then(() => {
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
                ).then(() => {
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

//changer placé sur le plan
jeuxFestival.post('/update-place/:suivJ_id', (req, res) => {
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
                        suivJ_place: req.body.suivJ_place, //j'utilize pas sanitize sinon il transforme mon booléen en undefine..
                        suivJ_dateSaisie: Sequelize.literal('NOW()'),
                    },
                    {
                        where: {
                            suivJ_id: req.sanitize(req.params.suivJ_id)
                        }
                    }
                ).then(() => {
                    res.json({success: "Placé changé!"})
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

//changer jeu tombola
jeuxFestival.post('/update-tombola/:suivJ_id', (req, res) => {
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
                        suivJ_tombola: req.body.suivJ_tombola, //j'utilize pas sanitize sinon il transforme mon booléen en undefine..
                        suivJ_dateSaisie: Sequelize.literal('NOW()'),
                    },
                    {
                        where: {
                            suivJ_id: req.sanitize(req.params.suivJ_id)
                        }
                    }
                ).then(() => {
                    res.json({success: "Tombola changé!"})
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

//changer dotation
jeuxFestival.post('/update-dotation/:suivJ_id', (req, res) => {
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
                        suivJ_dotation: req.body.suivJ_dotation, //j'utilize pas sanitize sinon il transforme mon booléen en undefine..
                        suivJ_dateSaisie: Sequelize.literal('NOW()'),
                    },
                    {
                        where: {
                            suivJ_id: req.sanitize(req.params.suivJ_id)
                        }
                    }
                ).then(() => {
                    res.json({success: "Dotation changé!"})
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

//update nb jeux reçus
jeuxFestival.post('/update-nbJeuxRecus/:suivJ_id', (req, res) => {
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
                        suivJ_nbJeuxRecus: req.sanitize(req.body.suivJ_nbJeuxRecus),
                        suivJ_dateSaisie: Sequelize.literal('NOW()'),
                    },
                    {
                        where: {
                            suivJ_id: req.sanitize(req.params.suivJ_id)
                        }
                    }
                ).then(() => {
                    res.json({success: "Nombre de jeux reçus changé!"})
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

//update nb jeux exposés
jeuxFestival.post('/update-nbJeuxExposes/:suivJ_id', (req, res) => {
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
                        suivJ_nbJeuxExposes: req.sanitize(req.body.suivJ_nbJeuxExposes),
                        suivJ_dateSaisie: Sequelize.literal('NOW()'),
                    },
                    {
                        where: {
                            suivJ_id: req.sanitize(req.params.suivJ_id)
                        }
                    }
                ).then(() => {
                    res.json({success: "Nombre de jeux exposés changé!"})
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

//changer recu
jeuxFestival.post('/update-recu/:suivJ_id', (req, res) => {
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
                        suivJ_recu: req.body.suivJ_recu, //j'utilize pas sanitize sinon il transforme mon booléen en undefine..
                        suivJ_dateSaisie: Sequelize.literal('NOW()'),
                    },
                    {
                        where: {
                            suivJ_id: req.sanitize(req.params.suivJ_id)
                        }
                    }
                ).then(() => {
                    res.json({success: "Reçu changé!"})
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

//changer a renvoyer
jeuxFestival.post('/update-aRenvoyer/:suivJ_id', (req, res) => {
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
                        suivJ_aRenvoyer: req.body.suivJ_aRenvoyer, //j'utilize pas sanitize sinon il transforme mon booléen en undefine..
                        suivJ_dateSaisie: Sequelize.literal('NOW()'),
                    },
                    {
                        where: {
                            suivJ_id: req.sanitize(req.params.suivJ_id)
                        }
                    }
                ).then(() => {
                    res.json({success: "A renvoyer changé!"})
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

//changer renvoyé
jeuxFestival.post('/update-renvoye/:suivJ_id', (req, res) => {
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
                        suivJ_renvoye: req.body.suivJ_renvoye, //j'utilize pas sanitize sinon il transforme mon booléen en undefine..
                        suivJ_dateSaisie: Sequelize.literal('NOW()'),
                    },
                    {
                        where: {
                            suivJ_id: req.sanitize(req.params.suivJ_id)
                        }
                    }
                ).then(() => {
                    res.json({success: "Renvoyé changé!"})
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
