const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'localisation',
    {
        loc_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        loc_prixTable : {
            type: Sequelize.FLOAT
        },
        loc_prixM2 : {
            type: Sequelize.FLOAT
        },
        loc_libelle : {
            type: Sequelize.STRING(50)
        }
    },
    {
        timestamps: false,
        tableName: 'localisation',
        freezeTableName: true
    }
)

localisation.associate = (models) => {
    belongToMany(models.espace, {foreignKey: 'loc_id'})
}