const Sequelize = require('sequelize')
const db = require("../database/db.js")
const Festival = require("./Festival")
const Suivi_jeu = require("./Suivi_jeu")
const Jeu = require("./Jeu")

const Reservation = db.sequelize.define(
    'reservation',
    {
        res_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        res_facture: {
            type: Sequelize.BOOLEAN
        },
        res_paiement: {
            type: Sequelize.BOOLEAN
        },
        res_prixNegocie: {
            type: Sequelize.FLOAT
        },
        res_envoiDebut: {
            type: Sequelize.BOOLEAN
        },
        res_aRetourner: {
            type: Sequelize.BOOLEAN
        },
        res_renvoiFin: {
            type: Sequelize.BOOLEAN
        },
        res_prixRetour: {
            type: Sequelize.FLOAT
        },
        fes_id: { // foreign key
            type: Sequelize.INTEGER
        },
        soc_id: { // foreign key
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'reservation',
        freezeTableName: true
    }
)

Reservation.belongsTo(Festival, {
    foreignKey: {name: "fes_id"},
});
Festival.hasMany(Reservation, {
    foreignKey: {name: "fes_id"},
});

Suivi_jeu.belongsTo(Reservation, {
    foreignKey: { name: "res_id" },
});
Reservation.hasMany(Suivi_jeu, {
    foreignKey: { name: "res_id" },
});

Reservation.belongsToMany(Jeu,
    { through: Suivi_jeu, foreignKey: "res_id" }
    )
Jeu.belongsToMany(Reservation,
    {
        through: Suivi_jeu, foreignKey: "j_id"
    })

module.exports = Reservation
