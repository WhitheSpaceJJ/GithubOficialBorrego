import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";

const Usuario = db.define(
  "usuarios",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    paterno: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    materno: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
    // Los hooks son funciones que se ejecutan en ciertos eventos
    hooks: {
      beforeCreate: async function (usuario) {
        const salt = await bcrypt.genSalt(10);  
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
    },

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

// Métodos personalizados
Usuario.prototype.verificarPassword = function (password) { 
  return bcrypt.compareSync(password, this.password);
};

export default Usuario;
