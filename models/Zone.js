const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'zone',
    {
        zo_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        zo_libelle : {
            type: Sequelize.STRING(100)
        }
    },
    {
        timestamps: false,
        tableName: 'zone',
        freezeTableName: true
    }
)

zone.associate = (models) => {
    belongToMany(models.suivi_jeu, {foreignKey: 'zo_id'})
}