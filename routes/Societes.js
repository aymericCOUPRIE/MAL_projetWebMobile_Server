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
    Societe.update(
        {
            soc_estInactif: req.body.soc_estInactif ===  'true' ? 1 : 0
        },
        {
            where: {soc_id: req.body.soc_id}
        }
    ).then((response) => {
        console.log(response)
    })
})

module.exports = societes


