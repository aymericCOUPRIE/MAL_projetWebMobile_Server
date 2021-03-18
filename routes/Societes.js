const express = require("express");
const societes = express.Router();

const Societe = require("../models/Societe")
const Festival = require('../models/Festival')

const RoleFestival = require("../models/Role_festival")

societes.get('/affichage', (req, res) => {
    RoleFestival.findAll(
        {
            where: {},
            include: [Societe, Festival]
        }
    ).then((response) => {
        //console.log(response)
        res.send({res: response})
    })
})


societes.put("/updateStatusInactif", (req, res) => {
    Societe.update(
        {soc_estInactif: req.body.soc_estInactif},
        {where: {soc_id: req.body.soc_id}}
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    })
})


societes.put("/updateStatusEditeur", (req, res) => {
    RoleFestival.update(
        {rolF_estEditeur: req.body.rolF_estEditeur},
        {where: {soc_id: req.body.soc_id, fes_id: req.body.fes_id}}
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    })
})


societes.put("/updateStatusExposant", (req, res) => {
    console.log("REQ", req.body)
    RoleFestival.update(
        {rolF_estExposant: req.body.rolF_estExposant},
        {where: {soc_id: req.body.soc_id, fes_id: req.body.fes_id}}
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    })
})

module.exports = societes


