const Sequelize = require('sequelize')
const db = require('../database/db')

const express = require("express");
const contacts = express.Router();

contacts.post("/add/:soc_id", (req, res) => {
    console.log("PARAMS", req.params)
    console.log("BODY", req.body)
    res.send({message: "ok"})
})

module.exports = contacts;
