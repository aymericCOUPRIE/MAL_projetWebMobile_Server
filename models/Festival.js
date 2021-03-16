//sequelize remplace les requêtes sql
const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'festival',
    {
        fes_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fes_date : {
            type: Sequelize.DATEONLY
        },
        fes_nbTables : {
            type: Sequelize.FLOAT
        },
        fes_nom : {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)