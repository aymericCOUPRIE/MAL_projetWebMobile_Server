const Sequelize = require('sequelize')
const db = require('../database/db')

const express = require("express");
const contacts = express.Router();
const Contact = require("../models/Contact");

contacts.post("/add/:idExposant", (req, res) => {
   Contact.findOne({
        where: {
            co_nom: req.sanitize(req.body.nom),
            co_prenom : req.sanitize(req.body.prenom),
            soc_id: req.sanitize(req.params.idExposant)
        },
    })
        .then((contact) => {
            if (contact) {
                res.json({error: "Ce contact existe déjà.."})
            } else {
                const contactData = {
                    co_nom: req.sanitize(req.body.nom),
                    co_prenom : req.sanitize(req.body.prenom),
                    co_telFixe : req.sanitize(req.body.telFixe),
                    co_telPortable : req.sanitize(req.body.telPortable),
                    co_principal : req.sanitize(req.body.principal),
                    co_mail: req.sanitize(req.body.email),
                    co_rue: req.sanitize(req.body.rue),
                    co_ville: req.sanitize(req.body.ville),
                    co_codePostal: req.sanitize(req.body.codePostal),
                    co_pays: req.sanitize(req.body.pays),
                    co_fonction: req.sanitize(req.body.fonction),
                    soc_id: req.sanitize(req.params.idExposant)
                }
                Contact.create(contactData)
                    .then((contact) => {
                        res.json({success: "Contact créé avec succés!"})
                    })
                    .catch((err) => {
                        res.json("error: " + err);
                    });
            }

        })
        .catch((err) => {
            res.send("error: " + err);
        });
})

module.exports = contacts;
