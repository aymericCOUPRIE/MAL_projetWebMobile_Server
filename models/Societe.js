const Sequelize = require('sequelize')
const db = require("../database/db.js")
const Role_festival = require("./Role_festival");

//const role_festival = require("./Role_festival")

const societe = db.sequelize.define(
    'societe',
    {
        soc_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        soc_nom: {
            type: Sequelize.STRING
        },
        soc_estInactif: {
            type: Sequelize.BOOLEAN
        },
        soc_ville: {
            type: Sequelize.STRING
        },
        soc_rue: {
            type: Sequelize.STRING
        },
        soc_codePostal: {
            type: Sequelize.STRING
        },
        soc_pays: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        tableName: 'societe',
        freezeTableName: true,
    }
);

societe.associate = (models) => {
    //belongTo(models.reservation, {foreignKey: 'soc_id'});
    belongTo(models.role_festival, {foreignKey: 'FK_societe_roleFestival'});
    //belongTo(models.jeu, {foreignKey: 'soc_id'})
    //belongTo(models.suivi_exposant, {foreignKey: 'soc_id'})
}

module.exports = societe
