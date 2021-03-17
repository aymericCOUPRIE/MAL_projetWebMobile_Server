const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'festival',
    {
        fes_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fes_date : {
            type: Sequelize.DATEONLY
        },
        fes_nbTables : {
            type: Sequelize.FLOAT
        },
        fes_nom : {
            type: Sequelize.STRING(100)
        }
    },
    {
        timestamps: false,
        tableName: 'festival',
        freezeTableName: true
    }
)

festival.associate = (models) => {
    belongToMany(models.reservation, {foreignKey: 'fes_id'});
    belongToMany(models.role_festival, {foreignKey: 'fes_id'});
    belongToMany(models.suivi_exposant, {foreignKey: 'fes_id'});
}