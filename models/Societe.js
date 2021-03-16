const Sequelize = require('sequelize')
const db = require("../database/db.js")


const Societe = db.sequelize.define(
    'societe',
    {
        soc_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        soc_nom: {
            type: Sequelize.STRING
        },
        soc_estInactif: {
            type: Sequelize.BOOLEAN
        },
        soc_ville: {
            type: Sequelize.STRING
        },
        soc_rue: {
            type: Sequelize.STRING
        },
        soc_codePostal: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'societe',
        freezeTableName: true
    }
);

module.exports = Societe
