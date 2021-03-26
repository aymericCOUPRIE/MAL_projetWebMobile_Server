const Sequelize = require('sequelize')
const db = require("../database/db.js")
const Zone = require("./Zone")
const Reservation = require("./Reservation")

const Suivi_jeu = db.sequelize.define(
    'suivi_jeu',
    {
        suivJ_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        suivJ_nbJeuxRecus: {
            type: Sequelize.INTEGER
        },
        suivJ_nbJeuxExposes: {
            type: Sequelize.INTEGER
        },
        suivJ_place: {
            type: Sequelize.BOOLEAN
        },
        suivJ_dateSaisie: {
            type: Sequelize.DATEONLY
        },
        suivJ_tombola: {
            type: Sequelize.BOOLEAN
        },
        suivJ_dotation: {
            type: Sequelize.BOOLEAN
        },
        suivJ_recu: {
            type: Sequelize.BOOLEAN
        },
        suivJ_prototype:{
            type: Sequelize.BOOLEAN
        },
        zo_id: { // foreign key
            type: Sequelize.INTEGER
        },
        j_id: { // foreign key
            type: Sequelize.INTEGER,
            references: {
                model: "jeu",
                key: "j_id"
            }
        },
        res_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "reservation",
                key: "res_id"
            }
        }
    },
    {
        timestamps: false,
        tableName: 'suivi_jeu',
        freezeTableName: true
    }
);


Suivi_jeu.belongsTo(Zone, {
    foreignKey: { name: "zo_id" },
});
Zone.hasMany(Suivi_jeu, {
    foreignKey: { name: "zo_id" },
});

module.exports = Suivi_jeu
