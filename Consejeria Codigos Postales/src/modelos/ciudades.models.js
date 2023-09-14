const {Ciudad, Colonia} = require('../utilidades/models');

Ciudad.hasMany(Colonia, {foreignKey: 'id_ciudad'}); // Add a foreign key to Colonia

module.exports = {
    Ciudad,
    Colonia,
};


