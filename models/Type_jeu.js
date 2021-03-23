const Sequelize = require('sequelize')
const db = require("../database/db.js")
const jeu = require('./Jeu')

const Type_jeu = db.sequelize.define(
    'type_jeu',
    {
        typJ_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        typJ_libelle : {
            type: Sequelize.STRING(50)
        }
    },
    {
        timestamps: false,
        tableName: 'type_jeu',
        freezeTableName: true
    }
);



module.exports = Type_jeu