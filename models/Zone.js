const Sequelize = require('sequelize')
const db = require("../database/db.js")
const suivi_jeu = require("./Suivi_jeu")

const Zone = db.sequelize.define(
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
);

Zone.associate = (models) => {
    belongToMany(models.suivi_jeu, {foreignKey: 'zo_id'})
}

module.exports = Zone