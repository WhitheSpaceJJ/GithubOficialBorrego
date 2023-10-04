const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

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
    DTYPE: {
      type: DataTypes.STRING(20),
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
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_proceso_judicial" },
        ]
      },
      {
        name: "id_juzgado",
        using: "BTREE",
        fields: [
          { name: "id_juzgado" },
        ]
      },
    ]
  });

  module.exports = procesoJudicial;