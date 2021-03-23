const Sequelize = require('sequelize')
const db = require("../database/db.js")

const Suivi_exposant = db.sequelize.define(
    'suivi_exposant',
    {
        suivE_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        suivE_benevole: {
            type: Sequelize.BOOLEAN
        },
        suivE_nbBenevoles: {
            type: Sequelize.INTEGER
        },
        suivE_deplacement: {
            type: Sequelize.BOOLEAN
        },
        suivE_dateContact1: {
            type: Sequelize.DATEONLY
        },
        suivE_dateContact2: {
            type: Sequelize.DATEONLY
        },
        suivE_dateContact3: {
            type: Sequelize.DATEONLY
        },
        suivD_id: { // foreign key
            type: Sequelize.INTEGER
        },
        fes_id: { // foreign key
            type: Sequelize.INTEGER
        },
        soc_id: {// foreign key
            type: Sequelize.INTEGER
        },
        suivE_commentaire: {
            type: Sequelize.TEXT
        },
    },
    {
        timestamps: false,
        tableName: 'suivi_exposant',
        freezeTableName: true
    }
)


module.exports = Suivi_exposant
