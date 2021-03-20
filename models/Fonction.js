const Sequelize = require('sequelize')
const db = require("../database/db.js")
const contact = require('./Contact')

module.exports = db.sequelize.define(
    'fonction',
    {
        fonc_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fonc_libelle : {
            type: Sequelize.STRING(50)
        }
    },
    {
        timestamps: false,
        tableName: 'fonction',
        freezeTableName: true
    }
)

fonction.associate = (models) => {
    belongToMany(models.contact, {foreignKey: 'fonc_id'})
}