require("dotenv").config();

console.log(process.env.DB_NAME)

//bd du site
const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
console.log(sequelize)
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch((err) => {
        console.log('unable to connect to the database:', err)
    })
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;


//local
/*const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize(
    process.env.DB_NAME_LOCAL,
    process.env.DB_USER_LOCAL,
    process.env.DB_PASSWORD_LOCAL, {
        host: process.env.HOST_LOCAL,
        port: process.env.PORT_LOCAL,
        dialect: "mysql",
        operatorsAliases: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

db.sequelize = sequelize;

module.exports = db;*/