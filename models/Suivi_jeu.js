const Sequelize = require('sequelize')
const db = require("../database/db.js")
const zone = require('./Zone')
const jeu = require('./Jeu')


const Suivi_jeu = db.sequelize.define(
    'suivi_jeu',
    {
        suivJ_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        suivJ_nbJeuxRecus : {
            type: Sequelize.INTEGER
        },
        suivJ_nbJeuxExposes : {
            type: Sequelize.INTEGER
        },
        suivJ_place : {
            type: Sequelize.BOOLEAN
        },
        suivJ_dateSaisie : {
            type: Sequelize.DATEONLY
        },
        suivJ_tombola : {
            type: Sequelize.BOOLEAN
        },
        suivJ_dotation : {
            type: Sequelize.BOOLEAN
        },
        zo_id : { // foreign key
            type: Sequelize.INTEGER
        },
        j_id : { // foreign key
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'suivi_jeu',
        freezeTableName: true
    }
);

//Suivi_jeu.hasOne(zone, {foreignKey: 'zo_id'})
//Suivi_jeu.hasOne(jeu, {foreignKey: 'j_id'})

module.exports = Suivi_jeu