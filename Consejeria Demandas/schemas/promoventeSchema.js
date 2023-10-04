const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const promovente = sequelize.define('promovente', {
    id_participante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'participante',
            key: 'id_participante'
        }
    },
    espanol: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'promovente',
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
    ]
})

module.exports = promovente