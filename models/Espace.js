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
        esp_qte: {
            type: Sequelize.FLOAT
        },
        loc_id: { // foreign key
            type: Sequelize.INTEGER
        },
        res_id: { // foreign key
            type: Sequelize.INTEGER
        },
        esp_enTables: {
            type: Sequelize.BOOLEAN
        }
    },
    {
        timestamps: false,
        tableName: 'espace',
        freezeTableName: true
    }
)

/*Espace.associate((models) => {

})*/

Espace.belongsTo(Localisation, {
    foreignKey: {name: "loc_id"},
});
Localisation.hasMany(Espace, {
    foreignKey: {name: "loc_id"},
});

Reservation.belongsTo(Espace, {
    foreignKey: {name: "res_id"},
});
Espace.hasOne(Reservation, {
    foreignKey: {name: "res_id"},
});

module.exports = Espace;
