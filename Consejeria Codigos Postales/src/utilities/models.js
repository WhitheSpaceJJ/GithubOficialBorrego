const sequelize = require("./connection.js"); // Import the connection to the database

const { DataTypes, Model } = require("sequelize"); // Import the built-in data types

const Estado = sequelize.define(
  "estados",
  {
    // Define the "estados" table
    id_estado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_estado: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false, // Don't include timestamps
    freezeTableName: true, // Use the same table name
    tableName: "estados", // Use the same table name
    underscored: true, // Use snake_case not camelCase
    name: {
      singular: "estado",
      plural: "estados",
    },
  }
);

const Municipio = sequelize.define(
  "municipios",
  {
    // Define the "municipios" table
    id_municipio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_municipio: {
      type: DataTypes.STRING(100),
      allowNull: false, // Don't allow null
    },
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Don't include timestamps
    freezeTableName: true, // Use the same table name
    tableName: "municipios", // Use the same table name
    underscored: true, // Use snake_case not camelCase
  }
);

const Ciudad = sequelize.define(
  "ciudades",
  {
    // Define the "ciudades" table
    id_ciudad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_ciudad: {
      type: DataTypes.STRING(50),
      allowNull: false, // Don't allow null
    },
  },
  {
    timestamps: false, // Don't include timestamps
    freezeTableName: true, // Use the same table name
    tableName: "ciudades", // Use the same table name
    underscored: true, // Use snake_case not camelCase
    name: {
      singular: "ciudad",
      plural: "ciudades",
    },
  }
);

const CodigoPostal = sequelize.define(
  "codigos_postales",
  {
    // Define the "codigos" table
    id_codigo_postal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo_postal: {
      type: DataTypes.INTEGER,
      allowNull: false, // Don't allow null
    },
    id_municipio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Don't include timestamps
    freezeTableName: true, // Use the same table name
    tableName: "codigos_postales", // Use the same table name
    underscored: true, // Use snake_case not camelCase
    name: {
        singular: "codigo_postal",
        plural: "codigos_postales",
      },
  }
);

const Colonia = sequelize.define(
  "colonias",
  {
    // Define the "colonias" table
    id_colonia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_colonia: {
      type: DataTypes.STRING(60),
      allowNull: false, // Don't allow null
    },
    id_ciudad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_codigo_postal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Don't include timestamps
    freezeTableName: true, // Use the same table name
    tableName: "colonias", // Use the same table name
    underscored: true, // Use snake_case not camelCase
  }
);

module.exports = {
  Estado,
  Municipio,
  Ciudad,
  CodigoPostal,
  Colonia,
};
