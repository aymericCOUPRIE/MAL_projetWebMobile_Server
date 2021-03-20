const Sequelize = require('sequelize')
const db = require("../database/db.js")


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

Suivi_discussion.associate = (models) => {
    belongToMany(models.suivi_exposant, {foreignKey: 'suivD_id'})
}


module.exports = Suivi_discussion


