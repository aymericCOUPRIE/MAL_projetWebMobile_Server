const express = require("express");
const societes = express.Router();

const db = require('../database/db')
const sequelize = require("sequelize");

const Societe = require("../models/Societe")
const RoleFestival = require("../models/Role_festival")


societes.get('/affichage', (req, res) => {

    db.sequelize.query(
        "SELECT fest.fes_id, fest.fes_date, rolF.soc_id, rolF.rolF_estEditeur, rolF.rolF_estExposant," +
        "soc.soc_nom, soc.soc_estInactif, soc.soc_rue, soc.soc_ville, soc.soc_codePostal, " +
        "suivEx.suivE_benevole, suivEx.suivE_dateContact1, suivEx.suivE_dateContact2, suivEx.suivE_dateContact3, suivEx.suivE_nbBenevoles, " +
        "suivD.suivD_libelle " +
        "FROM role_festival as rolF " +
        "INNER JOIN societe as soc ON rolF.soc_id = soc.soc_id " +
        "INNER JOIN festival as fest ON fest.fes_id = rolF.fes_id " +
        "LEFT JOIN suivi_exposant as suivEx ON suivEx.soc_id = soc.soc_id " +
        "LEFT JOIN suivi_discussion as suivD ON suivEx.suivD_id = suivD.suivD_id",
        {
            type: sequelize.QueryTypes.SELECT
        }
    ).then((response) => {
        console.log(response)
        res.send({res: response})
    }).catch((err) => {
        console.log(err)
    })

})


societes.put("/updateStatusInactif", (req, res) => {
    //console.log("REQ BODY", req.body)
    Societe.update(
        {soc_estInactif: req.body.soc_estInactif},
        {where: {soc_id: req.body.soc_id}}
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    })
})


societes.put("/updateStatusEditeur", (req, res) => {
    //console.log("REQ BODY", req.body)
    RoleFestival.update(
        {rolF_estEditeur: req.body.rolF_estEditeur},
        {where: {soc_id: req.body.soc_id, fes_id: req.body.fes_id}}
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    })
})


societes.put("/updateStatusExposant", (req, res) => {
    //console.log("REQ", req.body)
    RoleFestival.update(
        {rolF_estExposant: req.body.rolF_estExposant},
        {where: {soc_id: req.body.soc_id, fes_id: req.body.fes_id}}
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    })
})

module.exports = societes


