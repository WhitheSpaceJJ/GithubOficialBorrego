const { Sequelize } = require("sequelize");
const {
  DATABASE,
  DBUSER,
  DBPASSWORD,
  DBHOST,
  DBPORT,
} = require("../config/default.js");

const sequelize = new Sequelize(DATABASE, DBUSER, DBPASSWORD, { // Crear conexión a la base de datos
  host: DBHOST,
  port: DBPORT,
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize; // Exportar la conexión para que pueda ser usada en otros archivos
