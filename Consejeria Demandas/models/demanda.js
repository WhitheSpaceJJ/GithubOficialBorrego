const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('demanda', {
    id_demanda: {
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
    tipo_demanda: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    descripcion_demanda: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    fecha_demanda: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'demanda',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_demanda" },
        ]
      },
      {
        name: "id_proceso_judicial",
        using: "BTREE",
        fields: [
          { name: "id_proceso_judicial" },
        ]
      },
    ]
  });
};
