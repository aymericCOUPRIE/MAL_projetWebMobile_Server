const express = require("express");
const reservations = express.Router();

const db = require('../database/db')
const sequelize = require("sequelize")

const Reservation = require("../models/Reservation")
const SuiviExposant = require("../models/Suivi_exposant")
const Festival = require("../models/Festival")
const Societe = require("../models/Societe")
const {QueryTypes} = require("sequelize");

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

//récupérer toutes les données d'une réservation (même le suivi)
reservations.get('/:soc_id/:fes_id/allInformations', (req, res) => {
    console.log("ID FES RECUP", req.body.fes_id),
        console.log("societe",req.params.soc_id),
        console.log("BODY", req.body)
    db.sequelize.query("SELECT * FROM suivi_exposant INNER JOIN reservation ON suivi_exposant.soc_id = reservation.soc_id AND suivi_exposant.fes_id = reservation.fes_id WHERE suivi_exposant.soc_id = ? AND suivi_exposant.fes_id = ?",
        {
            replacements:[req.sanitize(req.params.soc_id), req.sanitize(req.params.fes_id)],
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
