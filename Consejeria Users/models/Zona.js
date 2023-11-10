import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Zona = db.define(
  "zonas",
  {
    id_zona: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    zona: {
      type: DataTypes.STRING(10),
      allowNull: false,
    }
  }
);