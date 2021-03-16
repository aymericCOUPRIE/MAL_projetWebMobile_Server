//sequelize remplace les requêtes sql
const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'contact',
    {
        co_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        co_nom : {
            type: Sequelize.STRING(100)
        },
        co_prenom : {
            type: Sequelize.STRING(100)
        },
        co_telFixe : {
            type: Sequelize.STRING(20)
        },
        co_telPortable : {
            type: Sequelize.STRING(20)
        },
        co_principal : {
            type: Sequelize.BOOLEAN
        },
        fonc_id : { // foreign key
            type: Sequelize.INTEGER
            //referencesKey: 'fonc_id'
        },
        soc_id : { // foreign key
            type: Sequelize.INTEGER
            //referencesKey: 'soc_id'
        }
    },
    {
        timestamps: false
    }
)

contact.hasOne(fonction, {foreignKey: 'fonc_id'})
contact.hasOne(societe, {foreignKey: 'soc_id'})