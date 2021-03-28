const Sequelize = require('sequelize')
const db = require('../database/db')
const express = require("express");
const localisations = express.Router();
const Localisation = require('../models/Localisation')

/**
 * Method which create a new localisation from the card of an existed festival
 */
localisations.post('/add/:fes_id', (req, res) => {
    Localisation.findOne({
        where: {
            loc_libelle: req.sanitize(req.body.loc_libelle),
            fes_id: req.sanitize(req.params.fes_id)
        },
    }).then((localisation) => {
        if (!localisation) {
            const localisationData = {
                loc_prixTable: req.sanitize(req.body.loc_prixTable),
                loc_prixM2: req.sanitize(req.body.loc_prixM2),
                loc_libelle: req.sanitize(req.body.loc_libelle),
                fes_id: req.sanitize(req.params.fes_id)
            }
            console.log("back lib :", req.sanitize(req.body.loc_libelle));
            console.log("back id :", req.sanitize(req.params.fes_id));
            Localisation.create(localisationData)
                .then((fes) => {
                    res.json({success: "The creation of the localisation successed"})
                })
                .catch((err) => {
                    res.json("The creation of the localisation failed - error: " + err);
                })
        } else {
            res.json({error: "A localisation already exists for this date"});
        }
    })
});

module.exports = localisations;