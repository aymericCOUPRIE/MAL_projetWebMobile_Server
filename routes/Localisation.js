const Sequelize = require('sequelize')
const db = require('../database/db')
const express = require("express");
const localisations = express.Router();
const Localisation = require('../models/Localisation');
const Espace = require('../models/Espace');

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

/**
 * Method which get all the localisations for a festival
 */
localisations.get("/allDetails/:fes_id", (req, res) => {
    Localisation.findAll({
        where: {
            fes_id: req.sanitize(req.params.fes_id)
        }
    })
        .then((localisations) => {
            if (!localisations) {
                res.json({error: "There is no localisation for this festival"});
            } else {
                res.json(localisations);
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
});

// to update the unit price of the table
localisations.put("/updatePriceTable", (req, res) => {
    Localisation.update(
        {
            loc_prixTable: req.sanitize(req.body.new_priceTable)
        },
        {
            where: {
                loc_id: req.sanitize(req.body.loc_id)
            }
        }
    ).then((response) => {
        res.send({message: 'The price for a table was modified.'})
    })
})

// to update the unit price of the table
localisations.put("/updatePriceM2", (req, res) => {
    Localisation.update(
        {
            loc_prixM2: req.sanitize(req.body.new_priceM2)
        },
        {
            where: {
                loc_id: req.sanitize(req.body.loc_id)
            }
        }
    ).then((response) => {
        res.send({message: 'The price for a m² was modified.'})
    })
})


//récupérer les espaces réservés par un exposant
/**
 * Method which get all the localisations for a festival
 */
localisations.get("/:fes_id/allEspace/reservation/:res_id", (req, res) => {
    Localisation.findAll({
        where: {
            fes_id: req.sanitize(req.params.fes_id)
        },
        include : [{
            model: Espace,
            where: {
                res_id: req.sanitize(req.params.res_id)
            }

        }]
    })
        .then((espaces) => {
            if (!espaces) {
                res.json({error: "There is no espace for this festival and  this reservation"});
            } else {
                res.json(espaces);
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
});

module.exports = localisations;