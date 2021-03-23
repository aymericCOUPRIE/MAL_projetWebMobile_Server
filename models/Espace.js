const Sequelize = require('sequelize')
const db = require("../database/db.js")
const Localisation = require('./Localisation')
const Reservation = require('./Reservation')

const Espace = db.sequelize.define(
    'espace',
    {
        esp_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        esp_qte : {
            type: Sequelize.FLOAT
        },
        loc_id : { // foreign key
            type: Sequelize.INTEGER
        },
        res_id : { // foreign key
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'espace',
        freezeTableName: true
    }
)

Espace.associate((models) => {
    Espace.belongsTo(models.Localisation, {
        foreignKey: { name: "loc_id" },
    });
    models.Localisation.hasMany(Espace, {
        foreignKey: { name: "loc_id" },
    });

    models.Reservation.belongsTo(Espace, {
        foreignKey: { name: "res_id"},
    });
    Espace.hasOne(models.Reservation, {
        foreignKey: { name: "res_id" },
    });
})

module.exports = espace;