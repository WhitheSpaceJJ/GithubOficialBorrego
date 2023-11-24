const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

/*
* Modelo de juzgado el cual contiene los atributos de un juzgado
*/
const juzgado = sequelize.define('juzgado', {
  id_juzgado: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre_juzgado: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'juzgado',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id_juzgado' }
      ]
    }
  ]
})

module.exports = juzgado
