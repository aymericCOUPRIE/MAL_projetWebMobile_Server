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
            type: Sequelize.INTEGER,
            references: {
                model: "societe",
                key: "soc_id"
            }
        },
        fes_id: { // foreign key
            type: Sequelize.INTEGER,
            references: {
                model: "festival",
                key: "fes_id"
            }
        }
    },
    {
        timestamps: false,
        tableName: 'role_festival',
        freezeTableName: true
    }
)

//REQUIRED when there no primary key to the table
//Role_festival.removeAttribute   ('id')

module.exports = Role_festival;
