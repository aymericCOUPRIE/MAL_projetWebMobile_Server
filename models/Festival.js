const Sequelize = require('sequelize')
const db = require("../database/db.js")
const Suivi_jeu = require('./Suivi_jeu')
const Role_festival = require('./Role_festival');
const Suivi_exposant = require('./Suivi_exposant');
const Zone = require('./Zone');

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
        }
    },
    {
        timestamps: false,
        tableName: 'festival',
        freezeTableName: true
    }
)

Role_festival.belongsTo(Festival, {
    foreignKey: {name: "fes_id"},
});
Festival.hasMany(Role_festival, {
    foreignKey: {name: "fes_id"},
});

Suivi_exposant.belongsTo(Festival, {
    foreignKey: {name: "fes_id"},
});
Festival.hasMany(Suivi_exposant, {
    foreignKey: {name: "fes_id"},
});

Zone.belongsTo(Festival, {
    foreignKey: {name: "fes_id"},
})
Festival.hasMany(Zone, {
    foreignKey: {name: "fes_id"},
});

module.exports = Festival;
