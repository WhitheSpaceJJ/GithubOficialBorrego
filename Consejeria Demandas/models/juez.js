const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

const juez = sequelize.define('juez', {
  id_juez: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre_juez: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'juez',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id_juez' }
      ]
    }
  ]
})

module.exports = juez
