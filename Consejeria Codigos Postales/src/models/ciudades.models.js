const {Ciudad, Colonia} = require('../utilities/models');

Ciudad.hasMany(Colonia, {foreignKey: 'id_ciudad'}); // Add a foreign key to Colonia

module.exports = {
    Ciudad,
    Colonia,
};


