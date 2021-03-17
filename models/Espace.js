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
        loc_id : { // foreign key
            type: Sequelize.INTEGER
        },
        res_id : { // foreign key
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'espace',
        freezeTableName: true
    }
)

espace.hasOne(localisation, {foreignKey: 'loc_id'})
espace.hasOne(reservation, {foreignKey: 'res_id'})