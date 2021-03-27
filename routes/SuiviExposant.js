const express = require("express");
const suiviExposants = express.Router();

const SuiviDiscussion = require('../models/Suivi_discussion')
const SuiviExposant = require('../models/Suivi_exposant')


suiviExposants.get("/getDiscussions", (req, res) => {

    SuiviDiscussion.findAll({
            attributes: ["suivD_id", "suivD_libelle"]
        }
    ).then((result) => {
        console.log("UPDATE", result)
        res.json(result)
    })
})


suiviExposants.put("/updateWorkflow", (req, res) => {
    console.log("REQ", req.body)

    SuiviExposant.update(
        {
            suivD_id: req.sanitize(parseInt(req.body.suivD_id)),
        },
        {
            where: {
                suivE_id: req.sanitize(req.body.suivE_id)
            }
        }
    ).then((result) => {
        console.log("RESULT", result)
        if (result == 0) {
            res.send({message: "UPDATE failed"})
        } else {
            res.send({message: "UPDATE success"})
        }
    })
})

suiviExposants.put("/updateBenevole", (req, res) => {
    console.log("REQ BODY", req.body)
    SuiviExposant.update(
        {
            suivE_benevole: req.sanitize(req.body.suivE_benevole)
        },
        {
            where: {
                suivE_id: req.sanitize(req.body.suivE_id)
            }
        }
    ).then((response => {
        console.log("UPDATE", response)
        res.send({message: "Update success"})
    })).catch((err) => {
        console.log(err)
    })
})


module.exports = suiviExposants;
