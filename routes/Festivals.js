const Sequelize = require('sequelize')
const express = require("express");
const festivals = express.Router();
const Festival = require("../models/Festival");
const { Op } = require('sequelize')


/**
 * Method which create a new festival
 */
festivals.post('/add', (req, res) => {
    Festival.findOne({
        where: {
            fes_date: req.sanitize(req.body.fes_date),
        },
    })
        .then((festival) => {
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
 * Method which get all the festivals
 */
festivals.get("/affichage",(req, res) => {
    Festival.findAll()
        .then((festivals) => {
            if (!festivals) {
                res.json({error: "Il n'y a aucun festival"});
            } else {
                res.json({allFestivals: festivals});
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


module.exports = festivals;
