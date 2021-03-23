const Sequelize = require('sequelize')
const db = require("../database/db.js")
const Reservation = require('./Reservation')
const Role_festival = require('./Role_festival')
const Suivi_exposant = require('./Suivi_exposant')

const Societe = db.sequelize.define(
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

    Reservation.belongsTo(Societe, {
        foreignKey: { name: "soc_id" },
    });

    Societe.hasMany(Reservation, {
        foreignKey: { name: "soc_id" },
    });

    Role_festival.belongsTo(Societe, {
        foreignKey: { name: "soc_id"}
    })

    Societe.hasMany(Role_festival, {
        foreignKey: { name: "soc_id" },
    });

    Suivi_exposant.belongsTo(Societe, {
        foreignKey: { name: "soc_id" },
    });

    Societe.hasMany(Suivi_exposant, {
        foreignKey: { name: "soc_id" },
    });

module.exports = Societe
