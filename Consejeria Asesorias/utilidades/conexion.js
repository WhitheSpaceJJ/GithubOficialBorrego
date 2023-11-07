const config = require('../configuracion/default.json');
const { Sequelize } = require('sequelize');

// Conexion a la base de datos
const sequelize = new Sequelize(
  config.database.databaseName,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: 'mysql',
    logging:false
  }
);

// Exportar la conexion
module.exports = sequelize;
