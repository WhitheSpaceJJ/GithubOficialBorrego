const config = require('./configuracion.json');
const { Sequelize } = require('sequelize');

// Crear instancia de Sequelize y establecer conexión a la base de datos
const sequelize = new Sequelize(
    config.database.databaseName,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        port: config.database.port,
        dialect: 'mysql',
        logging: false
    }
);

// Exportar la instancia de Sequelize para su uso en otros archivos
module.exports = sequelize;