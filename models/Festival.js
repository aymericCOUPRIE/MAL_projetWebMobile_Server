const Sequelize = require('sequelize')
const db = require("../database/db.js")
const Reservation = require('./Reservation')
const Role_Festival = require('./Role_festival');
const Suivi_exposant = require('./Suivi_exposant')

const Festival = db.sequelize.define(
    'festival',
    {
        fes_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fes_date: {
            type: Sequelize.DATEONLY
        },
        fes_nbTables: {
            type: Sequelize.FLOAT
        }
    },
    {
        timestamps: false,
        tableName: 'festival',
        freezeTableName: true
    }
)

Festival.associate = (models) => {

    models.Reservation.belongsTo(models.Festival, {
        foreignKey: {name: "fes_id"},
    });
    models.Festival.hasMany(models.Reservation, {
        foreignKey: {name: "fes_id"},
    });

    models.Role_Festival.belongsTo(models.Festival, {
        foreignKey: {name: "fes_id"},
    });
    models.Festival.hasMany(models.Role_Festival, {
        foreignKey: {name: "fes_id"},
    });


    models.Suivi_exposant.belongsTo(models.Festival, {
        foreignKey: {name: "fes_id"},
    });
    models.Festival.hasMany(models.Suivi_exposant, {
        foreignKey: {name: "fes_id"},
    });
}

module.exports = Festival;
