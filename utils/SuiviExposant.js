const Sequelize = require('sequelize')
const SuiviExposant = require('../models/Suivi_exposant')

const getAllSuiviExp = (fes_id) => {

    let getAll = null;
    SuiviExposant.findAll({
        where: {
            fes_id: fes_id
        }
    })
        .then((suiviExpList) => {
            if (suiviExpList) {
                //getAll = Sequelize.json(suiviExpList)
                getAll = suiviExpList;
            }
        })
    return getAll;
}

module.exports = getAllSuiviExp