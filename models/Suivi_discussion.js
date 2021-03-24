const Sequelize = require('sequelize')
const db = require("../database/db.js")
const Suivi_exposant = require('./Suivi_exposant')

const Suivi_discussion = db.sequelize.define(

    'suivi_discussion',
    {
        suivD_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        suivD_libelle: {
            type: Sequelize.STRING(50)
        }
    },
    {
        timestamps: false,
        tableName: 'suivi_discussion',
        freezeTableName: true
    }
)

/*Suivi_discussion.associate((models) => {
    models.Suivi_exposant.belongsTo(Suivi_discussion, {
        foreignKey: { name: "suivD_id" },
    });

    Suivi_discussion.hasMany(models.Suivi_exposant, {
        foreignKey: { name: "suivD_id" },
    });
})*/

module.exports = Suivi_discussion


