const Sequelize = require('sequelize')
const db = require("../database/db.js")
const Festival = require('./Festival')

const localisation = db.sequelize.define(
    'localisation',
    {
        loc_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        loc_prixTable : {
            type: Sequelize.FLOAT
        },
        loc_prixM2 : {
            type: Sequelize.FLOAT
        },
        loc_libelle : {
            type: Sequelize.STRING(50)
        },
        fes_id: { // foreign key
            type: Sequelize.INTEGER
        },
    },
    {
        timestamps: false,
        tableName: 'localisation',
        freezeTableName: true
    }
)

localisation.belongsTo(Festival, {
    foreignKey: {name: "fes_id"},
});
Festival.hasMany(localisation, {
    foreignKey: {name: "fes_id"},
});

module.exports = localisation