const sequelize = require("./conexion");

const { DataTypes } = require("sequelize");

const Zona = sequelize.define("zonas", {
  id_zona: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  zona: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 45]
    }
  }
}, {
  freezeTableName: true, 
  timestamps: false 
  ,
  name: {
    singular: 'zona',
    plural: 'zonas'
}
});

const TipoUser = sequelize.define("tipo_user", {
  id_tipouser
            : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
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
const Usuario = sequelize.define("usuarios", {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
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
  }
  ,
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 45]
    }
  }
  ,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 65]
    }
  },
  id_tipouser: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  ,
  id_zona: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true, 
  timestamps: false 
  ,
  name: {
    singular: 'usuario',
    plural: 'usuarios'
}
});
module.exports = {
  TipoUser
  ,
  Zona,
Usuario
};
