const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

const imputado = sequelize.define('Imputado', {
  id_participante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'participante',
      key: 'id_participante'
    }
  },
  delito: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'Imputado',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id_participante' }
      ]
    }
  ]
})

module.exports = imputado
