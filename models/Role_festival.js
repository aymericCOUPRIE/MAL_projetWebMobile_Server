const Sequelize = require('sequelize')
const db = require("../database/db.js")

const Societe = require("../models/Societe")
const Festival = require("../models/Festival")

const Role_festival = db.sequelize.define(
    'role_festival',
    {
        rolF_estExposant: {
            type: Sequelize.INTEGER
        },
        rolF_estEditeur: {
            type: Sequelize.INTEGER
        },
        soc_id: { // foreign key
            type: Sequelize.INTEGER
        },
        fes_id: { // foreign key
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'role_festival',
        freezeTableName: true
    }
)

module.exports = Role_festival;
