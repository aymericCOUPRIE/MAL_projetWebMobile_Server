const Sequelize = require('sequelize')
const db = require("../database/db.js")
const suivi_jeu = require("./Suivi_jeu")

const Zone = db.sequelize.define(
    'zone',
    {
        zo_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        zo_libelle : {
            type: Sequelize.STRING(100)
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
        tableName: 'zone',
        freezeTableName: true
    }
);

module.exports = Zone