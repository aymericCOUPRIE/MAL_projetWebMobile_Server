const express = require("express");
const zones = express.Router();
const db = require('../database/db')
const sequelize = require("sequelize");
const Zone = require('../models/Zone');

//toutes les zones
zones.get('/all',(req,res) =>{
    Zone.findAll({
        oder: [["zo_libelle","ASC"]],
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