const sequelize = require("./conexion");

const { DataTypes } = require("sequelize");

/**
 * @typedef {Object} Zona
 * @property {number} id_zona
 * @property {string} nombre_zona
 *  */
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

/**
 * @typedef {Object} TipoJuicio 
 * @property {number} id_tipo_juicio
 *  @property {string} tipo_juicio
 * */
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

/**
 * @typedef {Object} EstadoCivil
 * @property {number} id_estado_civil
 * @property {string} estado_civil
  */
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

  
/**
 * @typedef {Object} Genero
 * @property {number} id_genero
 * @property {string} descripcion_genero
 * */
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

/**
 * @typedef {Object} Motivo
 * @property {number} id_motivo
 * @property {string} descripcion_motivo
 * */
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

/**
 * @typedef {Object} Asesor
 * @property {number} id_asesor
 * @property {string} nombre_asesor
 * @property {number} id_zona
 * */
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

/**
 * @typedef {Object} CatalogoRequisito
 * @property {number} id_catalogo
 * @property {string} descripcion_catalogo
 * */
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

/**
 * @typedef {Object} Persona
 * @property {number} id_persona
 *  @property {string} nombre
 * @property {string} apellido_materno
 * @property {string} apellido_paterno
 * @property {number} edad
 * @property {string} telefono
 * @property {number} id_domicilio
 * @property {number} id_genero
 * */  
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

/**
 * @typedef {Object} DetalleAsesoriaCatalogo
 * @property {number} id_detalle
 * @property {number} id_asesoria
 * @property {number} id_catalogo
 * */

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

/**
 * @typedef {Object} Turno
 * @property {number} id_turno
 * @property {Date} fecha_turno
 * @property {Time} hora_turno
 * */
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

/**
 * @typedef {Object} Asesorado
 * @property {number} id_asesorado
 * @property {boolean} estatus_trabajo
 * @property {number} id_motivo
 * @property {number} id_estado_civil
 * @property {number} numero_hijos
 * @property {number} ingreso_mensual
 * */
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


/**
 *  @typedef {Object} Asesoria
 * @property {number} id_asesoria
 * @property {string} resumen_asesoria
 *  @property {string} conclusion_asesoria
 * @property {boolean} estatus_requisitos
 * @property {Date} fecha_registro
 * @property {number} id_asesor
 * @property {number} id_turno
 * @property {number} id_asesorado
 * @property {string} usuario 
 * @property {number} id_tipo_juicio
 */
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

/**
 * @typedef {Object} Domicilio
 * @property {number} id_domicilio
 * @property {string} calle_domicilio
 * @property {string} numero_exterior_domicilio
 * @property {string} numero_interior_domicilio
 * @property {number} id_colonia
 * */
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

//Module exports
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
