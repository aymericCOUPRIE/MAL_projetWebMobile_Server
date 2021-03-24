const express = require("express");
const societes = express.Router();

const db = require('../database/db')
const sequelize = require("sequelize");

//const Festival = require('../models/Festival')
const Societe = require("../models/Societe")
const RoleFestival = require("../models/Role_festival")
const {QueryTypes} = require("sequelize");
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
    ).then((result) => {
        //console.log(response)
        res.json(result)
    }).catch((err) => {
        console.log(err)
    })

})


societes.put("/updateStatusInactif", (req, res) => {
    console.log("UPDATE INACTIF", req.body)
    Societe.update(
        {
            soc_estInactif: req.sanitize(req.body.soc_estInactif ? 1 : 0)
        },
        {
            where: {
                soc_id: req.sanitize(req.body.soc_id)
            }
        }
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    }).catch((err) => {
        console.log(err)
    })
})


societes.put("/updateStatusEditeur", (req, res) => {
    console.log("UPDATE EDITEUR", req.body)
    RoleFestival.update(
        {rolF_estEditeur: req.sanitize(req.body.rolF_estEditeur ? 1 :0 )},
        {where: {soc_id: req.sanitize(req.body.soc_id), fes_id: req.sanitize(req.body.fes_id)}}
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    })
})


societes.put("/updateStatusExposant", (req, res) => {
    console.log("UPDATE EXPOSANT", req.body)

    RoleFestival.update(
        {rolF_estExposant: req.sanitize(req.body.rolF_estExposant  ? 1 :0 )},
        {where: {soc_id: req.sanitize(req.body.soc_id), fes_id: req.sanitize(req.body.fes_id)}}
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    })
})

societes.put("/updateDateContact/:numeroRelance", (req, res) => {
    console.log("UPDATE DATE", req.body, req.params)

    const column = `suivE_dateContact${req.sanitize(req.params.numeroRelance)}`

    SuiviExposant.update(
        {column: req.sanitize(req.body.suivE_dateContact)},
        {where: {suivE_id: req.sanitize(req.body.suivE_id)}}
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    })
})

//tous les éditeurs (id et nom)
societes.get("/allEditeurs", (req, res) => {
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

societes.post("/add", (req, res) => {

    Societe.create({
        soc_nom: req.sanitize(req.body.soc_nom),
        soc_ville: req.sanitize(req.body.soc_ville),
        soc_rue: req.sanitize(req.body.soc_rue),
        soc_codePostal: req.sanitize(req.body.soc_codePostal),
        soc_pays: req.sanitize(req.body.soc_pays)
    }).then((response) => {
        res.send({message: "CREATE success"})
    }).catch((err) => {
        res.send({message: "CREATE fail"})
    })
})


module.exports = societes


