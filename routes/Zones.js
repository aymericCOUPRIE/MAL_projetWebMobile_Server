const express = require("express");
const zones = express.Router();
const db = require('../database/db')
const sequelize = require("sequelize");
const Zone = require('../models/Zone');

//toutes les zones
zones.get('/all/:fes_id',(req,res) =>{
    console.log(req.params)
    Zone.findAll({
        order: [["zo_libelle","ASC"]],
        where: {
            fes_id: req.sanitize(req.params.fes_id)
        }
    }).then((zones) => {
        if(zones){
            res.json(zones);
        }else{
            res.send("Il n'y a pas de zones")
        }
    }).catch((err) => {
        res.send("error: " + err);
    });
})



module.exports = zones