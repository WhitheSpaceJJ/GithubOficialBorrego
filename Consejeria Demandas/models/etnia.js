const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const etnia = sequelize.define('etnia', {
    id_etnia: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'etnia',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "id_etnia" },
            ]
        },
    ]
});

module.exports = etnia;