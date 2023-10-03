const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participante', {
    id_participante: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DTYPE: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    id_escolaridad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'escolaridad',
        key: 'id_escolaridad'
      }
    },
    id_etnia: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'etnia',
        key: 'id_etnia'
      }
    },
    id_ocupacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ocupacion',
        key: 'id_ocupacion'
      }
    },
    id_persona: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "id_persona_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'participante',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_participante" },
        ]
      },
      {
        name: "id_persona_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_persona" },
        ]
      },
      {
        name: "id_escolaridad",
        using: "BTREE",
        fields: [
          { name: "id_escolaridad" },
        ]
      },
      {
        name: "id_etnia",
        using: "BTREE",
        fields: [
          { name: "id_etnia" },
        ]
      },
      {
        name: "id_ocupacion",
        using: "BTREE",
        fields: [
          { name: "id_ocupacion" },
        ]
      },
    ]
  });
};
