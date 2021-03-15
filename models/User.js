const Sequelize = require('sequelize')
const db = require("../database/db.js")

var User = db.sequelize.define(
    'user',
    {
        user_email:{
            type: Sequelize.STRING,
            primaryKey: true
        },
        user_motDePasse:{
            type: Sequelize.STRING
        },
        user_estAdmin:{
            type: Sequelize.BOOLEAN
        }
    },
    {
        timestamps: false,
        tableName: 'user',
        freezeTableName: true
    }
)

module.exports = User