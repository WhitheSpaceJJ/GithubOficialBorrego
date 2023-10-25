const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

const escolaridad = sequelize.define('escolaridad', {
  id_escolaridad: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  descripcion: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'escolaridad',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id_escolaridad' }
      ]
    }
  ]
})

module.exports = escolaridad
