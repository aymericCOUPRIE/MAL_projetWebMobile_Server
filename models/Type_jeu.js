const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
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
)

type_jeu.associate = (models) => {
    belongToMany(models.jeu, {foreignKey: 'typJ_id'})
}