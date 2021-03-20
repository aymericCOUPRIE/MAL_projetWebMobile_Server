const Sequelize = require('sequelize')
const db = require("../database/db.js")
const suivi_discussion = require('./Suivi_discussion')
const festival = require('./Festival')

const suivi_exposant = db.sequelize.define(
    'suivi_exposant',
    {
        suivE_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        suivE_benevole : {
            type: Sequelize.BOOLEAN
        },
        suivE_nbBenevoles : {
            type: Sequelize.INTEGER
        },
        suivE_deplacement : {
            type: Sequelize.BOOLEAN
        },
        suivE_dateContact1 : {
            type: Sequelize.DATEONLY
        },
        suivE_dateContact2 : {
            type: Sequelize.DATEONLY
        },
        suivE_dateContact3 : {
            type: Sequelize.DATEONLY
        },
        suivD_id : { // foreign key
            type: Sequelize.INTEGER
        },
        fes_id : { // foreign key
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'suivi_exposant',
        freezeTableName: true
    }
)

suivi_exposant.hasOne(suivi_discussion, {foreignKey: 'suivD_id'});
suivi_exposant.hasOne(festival, {foreignKey: 'fes_id'})

module.exports = suivi_exposant