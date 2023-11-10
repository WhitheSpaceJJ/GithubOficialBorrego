import { DataTypes } from "sequelize";
import db from "../config/db.js";

const TipoUser = db.define(
  "tipo_user",
  {
    id_tipouser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo_usuario: {
      type: DataTypes.STRING(10),
      allowNull: false,
    }
  }
);