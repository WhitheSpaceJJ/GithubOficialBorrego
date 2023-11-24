const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

/*
* Modelo de etnia el cual contiene los atributos de una etnia
* y establece las relaciones con el modelo de persona
*/
const etnia = sequelize.define('etnia', {
  id_etnia: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'etnia',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id_etnia' }
      ]
    }
  ]
})

module.exports = etnia
