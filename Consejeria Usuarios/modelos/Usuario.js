const sequelize = require("./conexion");
const { DataTypes } = require("sequelize");

const Usuario = sequelize.define(
  "usuarios",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 45]
      }
    },
    materno: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 45]
      }
    },
    paterno: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 45]
      }
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 65]
      }
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    name: {
      singular: "usuario",
      plural: "usuarios",
    },
  },
  {
    // Los scopes son funciones que nos permiten filtrar los resultados de las consultas
    scopes: {
      eliminarPassword: {
        attributes: {
          exclude: [
            "password",
            "id_zona"
          ],
        },
      },
    },
  }
);


module.exports = Usuario;
