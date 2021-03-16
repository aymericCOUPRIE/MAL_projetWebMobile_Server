//sequelize remplace les requêtes sql
const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'jeu',
    {
        j_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        j_titre : {
            type: Sequelize.STRING(50)
        },
        j_ageMin : {
            type: Sequelize.INTEGER
        },
        j_duree : {
            type: Sequelize.INTEGER
        },
        j_nbMaxJoueur : {
            type: Sequelize.INTEGER
        },
        j_nbJoueurMin : {
            type: Sequelize.INTEGER
        },
        j_lienNotice : {
            type: Sequelize.TEXT,
            default: null
        },
        typJ_id : { // foreign key
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    }
)

jeu.hasOne(type_jeu, {foreignKey: 'typJ_id'})