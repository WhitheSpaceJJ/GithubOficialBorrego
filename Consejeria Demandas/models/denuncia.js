const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

/*
* Modelo de denuncia el cual contiene los atributos de una denuncia 
* y establece las relaciones con los modelos de proceso judicial y juez
*/
const denuncia = sequelize.define('denuncia', {
  id_denuncia: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  id_proceso_judicial: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'proceso_judicial',
      key: 'id_proceso_judicial'
    }
  },
  causa_penal: {
    type: DataTypes.STRING(25),
    allowNull: true
  },
  delito: {
    type: DataTypes.STRING(25),
    allowNull: true
  },
  modalidad: {
    type: DataTypes.STRING(25),
    allowNull: true
  },
  hechos: {
    type: DataTypes.STRING(25),
    allowNull: true
  },
  plazo_cierre: {
    type: DataTypes.STRING(25),
    allowNull: true
  },
  unidad_mp: {
    type: DataTypes.STRING(25),
    allowNull: true
  },
  estrategia: {
    type: DataTypes.STRING(25),
    allowNull: true
  },
  id_juez: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'juez',
      key: 'id_juez'
    }
  }
}, {
  sequelize,
  tableName: 'denuncia',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id_denuncia' }
      ]
    },
    {
      name: 'id_proceso_judicial',
      using: 'BTREE',
      fields: [
        { name: 'id_proceso_judicial' }
      ]
    },
    {
      name: 'id_juez',
      using: 'BTREE',
      fields: [
        { name: 'id_juez' }
      ]
    }
  ]
})

module.exports = denuncia
