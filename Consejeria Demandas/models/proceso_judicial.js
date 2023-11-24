const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

/*
* Modelo de proceso judicial el cual contiene los atributos de un proceso judicial
* y establece las relaciones con el modelo de juzgado
*/
const procesoJudicial = sequelize.define('proceso_judicial', {
  id_proceso_judicial: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  fecha_inicio: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  fecha_proceso: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  fecha_conclusion: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  area_seguimiento: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  numero_expediente: {
    type: DataTypes.STRING(25),
    allowNull: true
  },
  id_juzgado: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'juzgado',
      key: 'id_juzgado'
    }
  }
}, {
  sequelize,
  tableName: 'proceso_judicial',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id_proceso_judicial' }
      ]
    },
    {
      name: 'id_juzgado',
      using: 'BTREE',
      fields: [
        { name: 'id_juzgado' }
      ]
    }
  ]
})

module.exports = procesoJudicial
