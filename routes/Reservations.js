const express = require("express");
const reservations = express.Router();

const db = require('../database/db')
const sequelize = require("sequelize")

const Reservation = require("../models/Reservation")

reservations.put('/updateReservationFacture', (req, res) => {
    console.log("VALUE RES_FACTURE", req.body.res_facture)
    Reservation.update(
        {res_facture: req.body.res_facture},
        {where: {res_id: req.body.res_id}}
    ).then((response) => {
        res.send({message: "Update réussi avec succès"})
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = reservations;
