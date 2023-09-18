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

/*
module.exports = {
  Ciudad,
  Turno, Persona,
  Asesorado, Asesoria,
  EstadoCivil,
  Asesor,
  DetalleAsesoriaCatalogo,
  CatalogoRequisito,
  Genero,
  Zona,
  Usuario,
  Estado,
  Motivo,
  Municipio,
  CodigoPostal,
  Colonia,
  Domicilio,
  TipoJuicio,
};

const CodigoPostal = sequelize.define("codigos_postales", {
  id_codigo_postal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  codigo_postal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_municipio: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

const Colonia = sequelize.define("colonias", {
  id_colonias: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  colonia: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 60]
    }
  },
  id_ciudad: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  id_codigo: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

const Estado = sequelize.define("estados", {
  id_estado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nombre_estado: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 100]
    }
  }
}, {
  timestamps: false
});

const Municipio = sequelize.define("municipios", {
  id_municipio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nombre_municipio: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 100]
    }
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});
const Ciudad = sequelize.define("ciudades", {
  id_ciudad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nombre_ciudad: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 50]
    }
  }
}, {
  timestamps: false
});


const Usuario = sequelize.define("usuarios", {
  usuario: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      len: [0, 75]
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 50]
    }
  },
  id_zona: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});




const Domicilio = sequelize.define("domicilios", {
  id_domicilio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  calle_domicilio: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 75]
    }
  },
  numero_exterior_domicilio: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 25]
    },
    defaultValue: null
  },
  numero_interior_domicilio: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 25]
    },
    defaultValue: null,
  },
  id_colonia: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

*/