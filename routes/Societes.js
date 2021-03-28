const express = require("express");
const societes = express.Router();

const db = require('../database/db')
const sequelize = require("sequelize");


const Societe = require("../models/Societe")
const RoleFestival = require("../models/Role_festival")
const {QueryTypes} = require("sequelize");
const SuiviExposant = require("../models/Suivi_exposant")
const Contact = require('../models/Contact');


/*
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
        "LEFT JOIN contact ON contact.soc_id = soc.soc_id " +
        "INNER JOIN festival as fest ON fest.fes_id = rolF.fes_id " +
        "LEFT JOIN suivi_exposant as suivEx ON suivEx.soc_id = soc.soc_id " +
        "LEFT JOIN suivi_discussion as suivD ON suivEx.suivD_id = suivD.suivD_id " +
        "LEFT JOIN reservation as res ON res.soc_id = soc.soc_id AND res.fes_id = fest.fes_id " +
        "LEFT JOIN espace as esp ON esp.res_id = res.res_id",
        {
            type: sequelize.QueryTypes.SELECT
        }
    ).then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err)
    })

})
*/


societes.put("/updateStatusInactif", (req, res) => {
    console.log("UPDATE INACTIF", req.body)
    Societe.update(
        {
            soc_estInactif: parseInt(req.sanitize(req.body.soc_estInactif))
        },
        {
            where: {
                soc_id: parseInt(req.sanitize(req.body.soc_id))
            }
        }
    ).then((response) => {
        console.log(response)
        res.send({message: 'Update réussi'})
    }).catch((err) => {
        console.log(err)
    })
})


societes.put("/updateStatusEditeur", (req, res) => {
    RoleFestival.update(
        {
            rolF_estEditeur: req.sanitize(req.body.rolF_estEditeur) ? 1 : 0
        },
        {
            where: {
                soc_id: req.sanitize(req.body.soc_id),
                fes_id: req.sanitize(req.body.fes_id)
            }
        }
    ).then((response) => {
        res.send({message: 'Update réussi'})
    })
})


societes.put("/updateStatusExposant", (req, res) => {

    RoleFestival.update(
        {
            rolF_estExposant: req.sanitize(req.body.rolF_estExposant) ? 1 : 0
        },
        {
            where:
                {
                    soc_id: parseInt(req.sanitize(req.body.soc_id)),
                    fes_id: parseInt(req.sanitize(req.body.fes_id))
                }
        }
    ).then((response) => {
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

// infos societe et ses contacts
societes.get('/:soc_id/contacts', (req, res) => {
    Societe.findOne({
        where: {soc_id: req.sanitize(req.params.soc_id)},
        attributes: {exclude: ["soc_estInactif"]},
        include: [
            {
                model: Contact,
            }
        ]
    })
        .then((contacts) => {
            if (contacts) {
                res.json(contacts);
            } else {
                res.send("Cet exposant n'existe pas..");
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
})

//changer nom societe
societes.post('/:soc_id/update-name', (req, res) => {
    Societe.update({
        soc_nom: req.sanitize(req.body.name)
    }, {
        where: {
            soc_id: req.sanitize(req.params.soc_id)
        }
    }).then(() => {
        res.json({success: "Nom changé!"})
    })
        .catch((err) => {
            res.json({error: err});
        });

})


//changer adresse societe
societes.post('/:soc_id/update-adress', (req, res) => {
    Societe.update({
        soc_rue: req.sanitize(req.body.soc_rue),
        soc_codePostal: req.sanitize(req.body.soc_codePostal),
        soc_ville: req.sanitize(req.body.soc_ville),
        soc_pays: req.sanitize(req.body.soc_pays)
    }, {
        where: {
            soc_id: req.sanitize(req.params.soc_id)
        }
    }).then(() => {
        res.json({success: "Adresse changé!"})
    })
        .catch((err) => {
            res.json({error: err});
        });

})

module.exports = societes


