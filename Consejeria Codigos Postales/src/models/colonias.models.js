const {Ciudad, Colonia, CodigoPostal} = require('../utilities/models');

Colonia.belongsTo(Ciudad, {foreignKey: 'id_ciudad'}); // Define the foreign key for "ciudades" table in "colonias" table

Colonia.belongsTo(CodigoPostal, {foreignKey: 'id_codigo_postal'}); // Define the foreign key for "codigos_postales" table in "colonias" table

Colonia.hasMany(CodigoPostal, {foreignKey: 'id_codigo_postal'}, ); // Define the foreign key for "codigos_postales" table in "colonias" table




module.exports = {
    Colonia,
    Ciudad,
    CodigoPostal,
};

