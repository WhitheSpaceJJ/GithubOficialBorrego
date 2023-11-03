const sequelize = require("./conexion");

const { DataTypes } = require("sequelize");

const Zona = sequelize.define(
  "zonas",
  {
    id_zona: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre_zona: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 50],
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    name: {
      singular: "zona",
      plural: "zonas",
    },
  }
);

const TipoJuicio = sequelize.define(
  "tipos_juicios",
  {
    id_tipo_juicio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    tipo_juicio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 100],
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const EstadoCivil = sequelize.define(
  "estados_civiles",
  {
    id_estado_civil: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    estado_civil: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 50],
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Genero = sequelize.define(
  "generos",
  {
    id_genero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    descripcion_genero: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 25],
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    name: {
      singular: "genero",
      plural: "generos",
    },
  }
);

const Motivo = sequelize.define(
  "motivos",
  {
    id_motivo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    descripcion_motivo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 75],
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    name: {
      singular: "motivo",
      plural: "motivos",
    },
  }
);

const Asesor = sequelize.define(
  "asesores",
  {
    id_asesor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre_asesor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 100],
      },
    },
    id_zona: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    name: {
      singular: "asesor",
      plural: "asesores",
    },
  }
);
const CatalogoRequisito = sequelize.define(
  "catalogo_requisitos",
  {
    id_catalogo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    descripcion_catalogo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 75],
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
const Persona = sequelize.define(
  "personas",
  {
    id_persona: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 50],
      },
    },
    apellido_materno: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 50],
      },
    },
    apellido_paterno: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 50],
      },
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 15],
      },
      defaultValue: null,
    },
    id_domicilio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_genero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    name: {
      singular: "persona",
      plural: "personas",
    },
  }
);

const DetalleAsesoriaCatalogo = sequelize.define(
  "detalle_asesorias_catalogos",
  {
    id_detalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    id_asesoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_catalogo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    name: {
      singular: "detalle_asesoria_catalogo",
      plural: "detalle_asesorias_catalogos",
    },
  }
);

const Turno = sequelize.define(
  "turnos",
  {
    id_turno: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    fecha_turno: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    hora_turno: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        is: /^([01]\d|2[0-3]):([0-5]\d)$/,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    name: {
      singular: "turno",
      plural: "turnos",
    },
  }
);

const Asesorado = sequelize.define(
  "asesorados",
  {
    id_asesorado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    estatus_trabajo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    id_motivo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
    id_estado_civil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numero_hijos: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    ingreso_mensual: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    name: {
      singular: "asesorado",
      plural: "asesorados",
    },
  }
);

const Asesoria = sequelize.define(
  "asesorias",
  {
    id_asesoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    resumen_asesoria: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 250],
      },
      defaultValue: null,
    },
    conclusion_asesoria: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 250],
      },
      defaultValue: null,
    },
    estatus_requisitos: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    id_asesor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_turno: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    id_asesorado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 75],
      },
    },
    id_tipo_juicio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    name: {
      singular: "asesoria",
      plural: "asesorias",
    },
  }
);

const Domicilio = sequelize.define(
  "domicilios",
  {
    id_domicilio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    calle_domicilio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 75],
      },
    },
    numero_exterior_domicilio: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 25],
      },
      defaultValue: null,
    },
    numero_interior_domicilio: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 25],
      },
      defaultValue: null,
    },
    id_colonia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    name: {
      singular: "domicilio",
      plural: "domicilios",
    },
  }
);


module.exports = {
  Turno,
  Persona,
  Asesorado,
  Asesoria,
  EstadoCivil,
  Domicilio,
  Asesor,
  DetalleAsesoriaCatalogo,
  CatalogoRequisito,
  Genero,
  Zona,
  Motivo,
  TipoJuicio,
};
