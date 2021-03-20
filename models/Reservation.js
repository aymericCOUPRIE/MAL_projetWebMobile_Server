const Sequelize = require('sequelize')
const db = require("../database/db.js")
const festival = require("./Festival")
const societe = require("./Societe")


const reservation = db.sequelize.define(
    'reservation',
    {
        res_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        res_commentaire : {
            type: Sequelize.TEXT
        },
        res_facture : {
            type: Sequelize.BOOLEAN
        },
        res_paiement : {
            type: Sequelize.BOOLEAN
        },
        res_prixNegocie : {
            type: Sequelize.FLOAT
        },
        res_envoiDebut : {
            type: Sequelize.BOOLEAN
        },
        res_recu : {
            type: Sequelize.BOOLEAN
        },
        res_aRetourner : {
            type: Sequelize.BOOLEAN
        },
        res_renvoiFin : {
            type: Sequelize.BOOLEAN
        },
        res_prixRetour : {
            type: Sequelize.FLOAT
        },
        fes_id : { // foreign key
            type: Sequelize.INTEGER
        },
        soc_id : { // foreign key
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'reservation',
        freezeTableName: true
    }
)

reservation.hasOne(festival, {foreignKey: 'fes_id'})
reservation.hasOne(societe, {foreignKey: 'soc_id'})

module.exports = reservation