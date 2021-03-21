const express = require("express");
const societes = express.Router();

const db = require('../database/db')
const sequelize = require("sequelize");

const Societe = require("../models/Societe")
const RoleFestival = require("../models/Role_festival")
const {QueryTypes} = require("sequelize");
const role_festival = require("../models/Role_festival")
const SuiviExposant = require("../models/Suivi_exposant")


societes.get('/affichage', (req, res) => {

    db.sequelize.query(
        "SELECT " +
        "   fest.fes_id, fest.fes_date, " +
        "   rolF.soc_id, rolF.rolF_estEditeur, rolF.rolF_estExposant, " +
        "   soc.soc_nom, soc.soc_estInactif, soc.soc_rue, soc.soc_ville, soc.soc_codePostal, " +
        "   suivEx.suivE_benevole, suivEx.suivE_dateContact1, suivEx.suivE_dateContact2, suivEx.suivE_dateContact3, suivEx.suivE_nbBenevoles, suivEx.suivE_commentaire, suivEx.suivE_id, " +
        "   suivD.suivD_libelle, " +
        "   res.res_id, res.res_facture, " +
        "   esp.esp_id, esp.esp_qte, esp.esp_enTables " +
        "FROM role_festival as rolF " +
        "INNER JOIN societe as soc ON rolF.soc_id = soc.soc_id " +
        "INNER JOIN festival as fest ON fest.fes_id = rolF.fes_id " +
        "LEFT JOIN suivi_exposant as suivEx ON suivEx.soc_id = soc.soc_id " +
        "LEFT JOIN suivi_discussion as suivD ON suivEx.suivD_id = suivD.suivD_id " +
        "LEFT JOIN reservation as res ON res.soc_id = soc.soc_id AND res.fes_id = fest.fes_id " +
        "LEFT JOIN espace as esp ON esp.res_id = res.res_id",
        {
            type: sequelize.QueryTypes.SELECT
        }
    ).then((response) => {
        //console.log(response)
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

societes.put("/updateDateContact1", (req, res) => {
    //console.log("REQ", req.body)
    SuiviExposant.update(
        {suivE_dateContact1: req.body.suivE_dateContact},
        {where: {suivE_id: req.body.suivE_id}}
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    })
})

societes.put("/updateDateContact2", (req, res) => {
    //console.log("REQ", req.body)
    SuiviExposant.update(
        {suivE_dateContact2: req.body.suivE_dateContact},
        {where: {suivE_id: req.body.suivE_id}}
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    })
})

societes.put("/updateDateContact3", (req, res) => {
    //console.log("REQ", req.body)
    SuiviExposant.update(
        {suivE_dateContact3: req.body.suivE_dateContact},
        {where: {suivE_id: req.body.suivE_id}}
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    })
})



//tous les éditeurs
societes.get("/allEditeurs", (req,res) => {
    /*
    Societe.findAll({
                include: [RoleFestival],
                where: { rolF_estEditeur: 1}

    })*/
    db.sequelize
        .query(
            "SELECT DISTINCT societe.soc_id, societe.soc_nom  FROM `societe`, role_festival WHERE role_festival.soc_id = societe.soc_id and role_festival.rolF_estEditeur=1",
            {
                type: QueryTypes.SELECT,
                raw: false
            }
        )
    .then((editeurs) => {

        if (editeurs) {
            res.json(editeurs);
        } else {
            res.send("Il n'y a pas d'éditeurs");
        }
    })
        .catch((err) => {
            res.send("error: " + err);
        });
})


module.exports = societes


