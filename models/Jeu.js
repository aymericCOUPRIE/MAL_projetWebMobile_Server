const Sequelize = require('sequelize')
const db = require("../database/db.js")
const Societe = require('./Societe')
const Type_jeu = require('./Type_jeu')
const Suivi_jeu = require('./Suivi_jeu')



const Jeu = db.sequelize.define(
    'jeu',
    {
        j_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        j_titre : {
            type: Sequelize.STRING(50)
        },
        j_ageMin : {
            type: Sequelize.INTEGER
        },
        j_duree : {
            type: Sequelize.INTEGER
        },
        j_nbMaxJoueurs : {
            type: Sequelize.INTEGER
        },
        j_nbMinJoueurs : {
            type: Sequelize.INTEGER
        },
        j_lienNotice : {
            type: Sequelize.TEXT,
            default: null
        },
        typJ_id : { // foreign key
            type: Sequelize.INTEGER
        },
        soc_id : { // foreign key
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'jeu',
        freezeTableName: true
    }
);

Jeu.belongsTo(Type_jeu, {
    foreignKey: { name: "typJ_id" },
});
Type_jeu.hasMany(Jeu, {
    foreignKey: { name: "typJ_id" },
});


Jeu.belongsTo(Societe, {
    foreignKey: { name: "soc_id" },
});
Societe.hasMany(Jeu, {
    foreignKey: { name: "soc_id" },
});

Suivi_jeu.belongsTo(Jeu, {
    foreignKey: { name: "j_id" },
});
Jeu.hasMany(Suivi_jeu, {
    foreignKey: { name: "j_id" },
});



module.exports = Jeu