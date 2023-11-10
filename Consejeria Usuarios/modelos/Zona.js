const sequelize = require("./conexion");
const { DataTypes } = require("sequelize");

const Zona = sequelize.define(
  "zonas",
  {
    id_zona: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    zona: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 45]
      }
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    name: {
      singular: "zona",
      plural: "zonas",
    },
  }

);

module.exports = Zona;