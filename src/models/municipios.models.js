const {Municipio, Estado, CodigoPostal} = require('../utilities/models.js');

Municipio.belongsTo(Estado, {foreignKey: 'id_estado'}); // Agrega la llave foranea id_estado a la tabla municipios

Municipio.hasMany(CodigoPostal, {foreignKey: 'id_municipio'}); // Agrega la llave foranea id_municipio a la tabla codigos_postales

module.exports = {
    Municipio,
    Estado,
    CodigoPostal
}
