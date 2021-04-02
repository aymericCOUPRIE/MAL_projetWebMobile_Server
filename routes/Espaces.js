const express = require("express");
const espaces = express.Router();

const db = require('../database/db')
const Sequelize = require("sequelize")

const Espace = require("../models/Espace")

//modifier une qte espace
espaces.put('/updateQte', (req,res) => {
    Espace.update(
        {
            esp_qte: req.sanitize(req.body.esp_qte),
        },
        {
            where: {
                esp_id: parseInt(req.sanitize(req.body.esp_id))
            }
        }
    ).then((response) => {
        res.send({message: "Update réussi avec succès"})
    }).catch((err) => {
        res.json({error: err});
    })
})

//modifier une enTables espace
espaces.put('/updateEnTables', (req,res) => {
    console.log("TABLEEEE",req.body.esp_enTables)
    console.log("IDDD",req.body.esp_id)
    Espace.update(
        {
            esp_enTables: parseInt(req.sanitize(req.body.esp_enTables))
        },
        {
            where: {
                esp_id: parseInt(req.sanitize(req.body.esp_id))
            }
        }
    ).then((response) => {
        res.send({message: "Update réussi avec succès"})
    }).catch((err) => {
        res.json({error: err});
    })
})

module.exports = espaces;