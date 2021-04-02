const express = require("express");
const reservations = express.Router();

const db = require('../database/db')
const Sequelize = require("sequelize")

const Reservation = require("../models/Reservation")
const SuiviExposant = require("../models/Suivi_exposant")
const Festival = require("../models/Festival")
const Societe = require("../models/Societe")
const Espace = require("../models/Espace")
const Localisation = require("../models/Localisation")

const {QueryTypes} = require("sequelize");

reservations.get("/festival/:fes_id/societe/:soc_id", (req, res) => {
    Reservation.findOne(
        {
            where: {
                fes_id: req.sanitize(req.params.fes_id),
                soc_id: req.sanitize(req.params.soc_id)
            }
        }
    )
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
})


reservations.get("/afficherAllReservation/:fes_id", (req, res) => {

    Reservation.findAll(
        {
            where: {
                fes_id: req.sanitize(req.params.fes_id)
            },
            include: [
                {
                    model: Espace,
                    include: [
                        {
                            model: Localisation
                        }
                    ]
                },
                {
                    model: Societe,
                    required: true
                }
            ]
        }
    ).then((result) => {
        if (result) {
            res.json(result)
        } else {
            res.send({message: "FAIL GET RESA"})
        }
    })
})


reservations.put('/updateReservationFacture', (req, res) => {

    Reservation.update(
        {
            res_facture: parseInt(req.sanitize(req.body.res_facture)),
            res_dateFacturation: Sequelize.literal('NOW()')
        },
        {
            where: {
                res_id: parseInt(req.sanitize(req.body.res_id))
            }
        }
    ).then((response) => {
        res.send({message: "Update réussi avec succès"})
    }).catch((err) => {
        res.json({error: err});
    })
})

//changer la date de facturation
reservations.put('/updateDateFacturation', (req, res) => {

    Reservation.update(
        {
            res_dateFacturation: req.sanitize(req.body.res_dateFacturation)
        },
        {
            where: {
                res_id: parseInt(req.sanitize(req.body.res_id))
            }
        }
    ).then((response) => {
        res.send({message: "Update réussi avec succès"})
    }).catch((err) => {
        res.json({error: err});
    })
})


reservations.put('/updateReservationLocalisation', (req, res) => {

    Espace.update(
        {
            loc_id: parseInt(req.sanitize(req.body.loc_id))
        },
        {
            where: {
                res_id: parseInt(req.sanitize(req.body.res_id))
            }
        }
    ).then((response) => {

        res.send({message: "Update réussi avec succès"})
    }).catch((err) => {
        res.json({error: err});
    })
})

reservations.put('/updateReservationPaiement', (req, res) => {

    Reservation.update(
        {
            res_paiement: parseInt(req.sanitize(req.body.res_paiement)),
            res_datePaiement: Sequelize.literal('NOW()')
        },
        {
            where: {
                res_id: parseInt(req.sanitize(req.body.res_id))
            }
        }
    ).then((response) => {
        res.send({message: "Update réussi avec succès"})
    }).catch((err) => {
        res.json({error: err});
    })
})

//update date paiement
reservations.put('/updateDatePaiement', (req, res) => {

    Reservation.update(
        {
            res_datePaiement: req.sanitize(req.body.res_datePaiement)
        },
        {
            where: {
                res_id: parseInt(req.sanitize(req.body.res_id))
            }
        }
    ).then((response) => {
        res.send({message: "Update réussi avec succès"})
    }).catch((err) => {
        res.json({error: err});
    })
})


reservations.put('/updateReservationPrixRetour', (req, res) => {

    Reservation.update(
        {
            res_prixRetour: parseFloat(req.sanitize(req.body.res_prixRetour))
        },
        {
            where: {
                res_id: parseInt(req.sanitize(req.body.res_id))
            }
        }
    ).then((response) => {
        res.send({message: "Update réussi avec succès"})
    }).catch((err) => {
        res.json({error: err});
    })
})


reservations.put('/updateReservationPrixNegocie', (req, res) => {


    Reservation.update(
        {
            res_prixNegocie: parseFloat(req.sanitize(req.body.res_prixNegocie))
        },
        {
            where: {
                res_id: parseInt(req.sanitize(req.body.res_id))
            }
        }
    ).then((response) => {
        res.send({message: "Update réussi avec succès"})
    }).catch((err) => {
        res.json({error: err});
    })
})

//update envoie jeux début
reservations.put('/updateEnvoieJeuxDebut', (req, res) => {


    Reservation.update(
        {
            res_envoiDebut: parseInt(req.sanitize(req.body.res_envoiDebut))
        },
        {
            where: {
                res_id: parseInt(req.sanitize(req.body.res_id))
            }
        }
    ).then((response) => {
        res.send({message: "Update réussi avec succès"})
    }).catch((err) => {
        res.json({error: err});
    })
})



//creer une reservation
reservations.post("/add", (req, res) => {
    Reservation.create(req.body, {
        include: [Espace]
    })
        .then((response) => {
            res.send(response)
        }).catch((err) => {
        res.json({error: err});
    })

})

/*
reservations.post("/addDefault", (req,res) => {

    const dataReservation = {
        fes_id: req.sanitize(req.body.fes_id),
        soc_id: req.sanitize(req.body.soc_id)
    }
    Reservation.create(dataReservation, {
        include: [Espace],

    })
        .then((response) => {
        res.send(response)
    }).catch((err) => {
        res.json({error: err});
    })
})
*/

module.exports = reservations;
