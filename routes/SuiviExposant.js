const express = require("express");
const suiviExposants = express.Router();

const SuiviDiscussion = require('../models/Suivi_discussion')
const SuiviExposant = require('../models/Suivi_exposant')
const {Op} = require("sequelize");


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


suiviExposants.put('/setAllAbsent', (req, res) => {

    console.log("ABSEEEENT")
    SuiviExposant.update(
        {
            suivD_id: 5
        },
        {
            where: {
                suivE_dateContact1: {
                    [Op.ne]: null
                },
                suivE_dateContact2: {
                    [Op.ne]: null
                },
                suivE_dateContact3: {
                    [Op.ne]: null
                },
            }
        }
    ).then((result) => {
        res.send({message: result})
    }).catch((err) => {
        console.log(err)
    })
})


suiviExposants.put("/updateBenevole", (req, res) => {
    console.log("REQ BODY", req.body)
    SuiviExposant.update(
        {
            suivE_benevole: parseInt(req.sanitize(req.body.suivE_benevole))
        },
        {
            where: {
                suivE_id: parseInt(req.sanitize(req.body.suivE_id))
            }
        }
    ).then((response => {
        console.log("UPDATE", response)
        res.send({message: "Update success"})
    })).catch((err) => {
        console.log(err)
    })
})


suiviExposants.put("/updateDateContact/:numeroRelance", (req, res) => {
    let colonne = "";

    switch (req.params.numeroRelance) {
        case "1":
            colonne = "suivE_dateContact1";
            break;
        case "2":
            colonne = "suivE_dateContact2";
            break;
        case "3":
            colonne = "suivE_dateContact3";
            break;
        default:
            res.send({message: "Requete impossible"})
            return
    }

    SuiviExposant.update(
        {
            [colonne]: req.sanitize(req.body.suivE_dateContact)
        },
        {
            where: {
                suivE_id: req.sanitize(req.body.suivE_id)
            }
        }
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    })
})


module.exports = suiviExposants;
