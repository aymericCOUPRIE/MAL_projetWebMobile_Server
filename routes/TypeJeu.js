const express = require("express");
const typeJeu = express.Router();
const TypeJeu = require("../models/Type_jeu");

//tous les types de jeu
typeJeu.get('/all', (req,res) => {
    TypeJeu.findAll({
        order: [["typJ_libelle", "ASC"]],
    })
        .then((types) => {
            if (types) {
                res.json(types);
            } else {
                res.send("Il n'y a pas encore de type de jeux");
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
})

//creer un type de jeu
typeJeu.post('/add', (req,res) => {
    TypeJeu.findOne({
        where: {
            typJ_libelle: req.sanitize(req.body.libelle),
        },
    })
        .then((type) => {
            if (type) {
                res.json({error: "Ce type existe déjà.."})
            } else {
                const typeData = {
                    typJ_libelle: req.sanitize(req.body.libelle),
                }
                TypeJeu.create(typeData)
                    .then((type) => {
                        res.json({success: "type créé avec succés!"})
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

//modifie libelle type jeu
typeJeu.post("/:typJ_id/update",(req,res) =>{
    TypeJeu.findOne({
        where:{
            typJ_id: req.sanitize(req.params.typJ_id),
        },
    })
        .then((type) => {
            if(!type){
                res.json({error: "Ce type n'existe pas"})
            }else{
                TypeJeu.update(
                    {typJ_libelle: req.sanitize(req.body.libelle)},
                    {where: { typJ_id: req.sanitize(req.params.typJ_id)}}
                ).then(() => {
                    res.json({ success: " Type modifié !" });
                })
                    .catch((err) => {
                        res.json({error: err});
                    });
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
})

module.exports = typeJeu;