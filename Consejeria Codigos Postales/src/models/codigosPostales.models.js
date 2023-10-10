const { CodigoPostal, Municipio, Colonia } = require('../utilities/models.js');

CodigoPostal.belongsTo(Municipio, { foreignKey: 'id_municipio' }); // Agrega la llave foranea id_municipio a la tabla codigos_postales

CodigoPostal.hasMany(Colonia, { foreignKey: 'id_codigo_postal' }); // Agrega la llave foranea id_codigo_postal a la tabla ciudades

module.exports = {
    CodigoPostal,
    Municipio,
    Colonia
}


