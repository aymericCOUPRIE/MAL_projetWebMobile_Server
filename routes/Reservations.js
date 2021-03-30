const express = require("express");
const reservations = express.Router();

const db = require('../database/db')
const sequelize = require("sequelize")

const Reservation = require("../models/Reservation")
const SuiviExposant = require("../models/Suivi_exposant")
const Festival = require("../models/Festival")
const Societe = require("../models/Societe")
const Espace = require("../models/Espace")
const Localisation = require("../models/Localisation")

const {QueryTypes} = require("sequelize");


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
            res_facture: parseInt(req.sanitize(req.body.res_facture))
        },
        {
            where: {
                res_id: parseInt(req.sanitize(req.body.res_id))
            }
        }
    ).then((response) => {
        res.send({message: "Update réussi avec succès"})
    }).catch((err) => {
        console.log(err)
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
        console.log("REPSONSE", response)
        res.send({message: "Update réussi avec succès"})
    }).catch((err) => {
        console.log(err)
    })
})

reservations.put('/updateReservationPaiement', (req, res) => {

    Reservation.update(
        {
            res_paiement: parseInt(req.sanitize(req.body.res_paiement))
        },
        {
            where: {
                res_id: parseInt(req.sanitize(req.body.res_id))
            }
        }
    ).then((response) => {
        res.send({message: "Update réussi avec succès"})
    }).catch((err) => {
        console.log(err)
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
        console.log(err)
    })
})


reservations.put('/updateReservationPrixNegocie', (req, res) => {

    console.log("REQ BODY", req.body)

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
        console.log(err)
    })
})


//récupérer toutes les données d'une réservation (même le suivi)
reservations.get('/:soc_id/:fes_id/allInformations', (req, res) => {

    db.sequelize.query("SELECT * FROM suivi_exposant INNER JOIN reservation ON suivi_exposant.soc_id = reservation.soc_id AND suivi_exposant.fes_id = reservation.fes_id WHERE suivi_exposant.soc_id = ? AND suivi_exposant.fes_id = ?",
        {
            replacements: [req.sanitize(req.params.soc_id), req.sanitize(req.params.fes_id)],
            type: sequelize.QueryTypes.SELECT
        })
        .then((resa) => {

            if (resa) {
                res.json(resa);
            } else {
                res.send("Il n'y a pas de réservation, ni de suivi pour cet exposant et ce festival..");
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
})

module.exports = reservations;
