const Sequelize = require('sequelize')
const db = require("../database/db.js")
const societe = require('./Societe')
const type_jeu = require('./Type_jeu')
const suivi_jeu = require('./Suivi_jeu')



const Jeu = db.sequelize.define(
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
        j_nbMaxJoueurs : {
            type: Sequelize.INTEGER
        },
        j_nbMinJoueurs : {
            type: Sequelize.INTEGER
        },
        j_lienNotice : {
            type: Sequelize.TEXT,
            default: null
        },
        typJ_id : { // foreign key
            type: Sequelize.INTEGER
        },
        soc_id : { // foreign key
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'jeu',
        freezeTableName: true
    }
);

Jeu.hasOne(type_jeu, {foreignKey: 'typJ_id'})
Jeu.hasOne(societe, {foreignKey: 'soc_id'})

Jeu.associate = (models) => {
    belongToMany(models.suivi_jeu, {foreignKey: 'j_id'})
}

module.exports = Jeu