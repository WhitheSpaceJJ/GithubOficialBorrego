const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estado_procesal', {
    id_estado_procesal: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion_estado_procesal: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    fecha_estado_procesal: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_proceso_judicial: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'proceso_judicial',
        key: 'id_proceso_judicial'
      }
    }
  }, {
    sequelize,
    tableName: 'estado_procesal',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_estado_procesal" },
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
