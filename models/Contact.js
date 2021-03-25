const Sequelize = require('sequelize')
const db = require("../database/db.js")
const Societe = require('./Societe')

const Contact = db.sequelize.define(
    'contact',
    {
        co_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        co_nom : {
            type: Sequelize.STRING(100)
        },
        co_prenom : {
            type: Sequelize.STRING(100)
        },
        co_telFixe : {
            type: Sequelize.STRING(20)
        },
        co_telPortable : {
            type: Sequelize.STRING(20)
        },
        co_principal : {
            type: Sequelize.BOOLEAN
        },
        soc_id : { // foreign key
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        tableName: 'contact',
        freezeTableName: true
    }
)

/*
Contact.associate((models) => {

})
*/

Contact.belongsTo(Societe, {
    foreignKey: { name: "soc_id" },
});
Societe.hasMany(Contact, {
    foreignKey: { name: "soc_id" },
});

module.exports = Contact;
