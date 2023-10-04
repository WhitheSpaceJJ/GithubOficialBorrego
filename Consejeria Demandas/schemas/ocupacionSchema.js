const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const ocupacion = sequelize.define('ocupacion', {
    id_ocupacion: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    descripcion_ocupacion: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'ocupacion',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "id_ocupacion" },
            ]
        },
    ]
});

module.exports = ocupacion;