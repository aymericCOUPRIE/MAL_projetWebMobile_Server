const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'user',
    {
        user_email:{
            type: Sequelize.STRING
        },
        user_motDePasse:{
            type: Sequelize.STRING
        },
        user_estAdmin:{
            type: Sequelize.BOOLEAN
        }
    },
    {
        timestamps: false
    }

)