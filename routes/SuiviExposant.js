const express = require("express");
const suiviExposants = express.Router();

const SuiviDiscussion = require('../models/Suivi_discussion')

suiviExposants.get("/getDiscussions", (req, res) => {
    SuiviDiscussion.findAll({}
    ).then((response) => {
        res.render({res: response})
        console.log()
    })
})

module.exports = suiviExposans();
