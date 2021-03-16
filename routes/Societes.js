const express = require("express");
const societes = express.Router();
const Societe = require("../models/Societe")

societes.get('/affichage', (req, res) => {
    Societe.findAll({
        attributes: ['soc_id', 'soc_nom', 'soc_estInactif', 'soc_ville', 'soc_rue', 'soc_codePostal']
    }).then((response) => {
        console.log("TEST" + response)
        res.send({societes: response})
    })
})


societes.put("/updateStatus", (req, res) => {

    var soc_estInactif
    if (req.body.soc_estInactif == "true") {
        soc_estInactif = 1
    } else {
        soc_estInactif = 0
    }

    Societe.update(
        {
            soc_estInactif: soc_estInactif
        },
        {
            where: {soc_id: req.body.soc_id+1}
        }
    ).then((response) => {
        console.log(response)
    })
})

module.exports = societes


