const Sequelize = require('sequelize')
const db = require("../database/db.js")
const espace = require('./Espace')

const localisation = db.sequelize.define(
    'localisation',
    {
        loc_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        loc_prixTable : {
            type: Sequelize.FLOAT
        },
        loc_prixM2 : {
            type: Sequelize.FLOAT
        },
        loc_libelle : {
            type: Sequelize.STRING(50)
        }
    },
    {
        timestamps: false,
        tableName: 'localisation',
        freezeTableName: true
    }
)


module.exports = localisation