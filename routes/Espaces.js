const express = require("express");
const espaces = express.Router();

const db = require('../database/db')
const Sequelize = require("sequelize")
const {Op} = require('sequelize')

const Espace = require("../models/Espace")
const Localisation = require("../models/Localisation")

// get all the espaces of a festival
espaces.get('/getAll/:fes_id', (req, res) => {
    Localisation.findAll( {
            attributes: ["loc_id", "loc_libelle", "fes_id"],
            where: {
                fes_id : req.sanitize(req.params.fes_id)
            }
        })
        .then((result) => {
            let tab = [];
            result.forEach((e) => {
                tab.push(e.dataValues.loc_id);
            })
            Espace.findAll({
                where: {
                    loc_id: {[Op.in]: tab}
                },
                include:[
                    {
                        model: Localisation
                    }
                ]
            })
                .then((list) => {
                    res.json(list)
                })
        })
})

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