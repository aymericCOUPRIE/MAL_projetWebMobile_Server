const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'role_festival',
    {
        rolF_estExposant: {
            type: Sequelize.INTEGER
        },
        rolF_estEditeur : {
            type: Sequelize.INTEGER
        },
        soc_id : { // foreign key
            type: Sequelize.INTEGER
        },
        fes_id : { // foreign key
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'role_festival',
        freezeTableName: true
    }
)

role_festival.hasOne(societe, {foreignKey: 'soc_id'})
role_festival.hasOne(festival, {foreignKey: 'fes_id'})