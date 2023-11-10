const sequelize = require("./conexion");
const { DataTypes } = require("sequelize");

const TipoUser = sequelize.define("tipo_user", {
  id_tipouser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  tipo_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 45]
    }
  }
}, {
  timestamps: false,
  tableName:"tipo_user"
});

module.exports = TipoUser;