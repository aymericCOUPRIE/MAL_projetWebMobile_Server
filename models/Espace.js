//sequelize remplace les requêtes sql
const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'espace',
    {
        esp_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        esp_qte : {
            type: Sequelize.FLOAT
        },
        esp_localisation : { // foreign key
            type: Sequelize.INTEGER
        },
        esp_reservation : { // foreign key
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    }
)

espace.hasOne(localisation, {foreignKey: 'loc_id'})