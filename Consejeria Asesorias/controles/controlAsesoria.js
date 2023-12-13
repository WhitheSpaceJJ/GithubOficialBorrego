const modeloAsesoria = require('../modelos/modeloAsesoria');
/** Operaciones Basica */
const controlPersonas = require('./controlPersonas');
const controlZonas = require('./controlZona');
const controlEstadoCivil = require('./controlEstadoCivil');
const controlMotivo = require('./controlMotivo');
const controlCatalogoRequisito = require('./controlCatalogoRequisito');
const controlDomicilios = require('./controlDomicilio');
const controlAsesorados = require('./controlAsesorados');
const controlTurnos = require('./controlTurno');
const controlDetalleAsesoria = require('./controlDetalleAsesoria');
const controlAsesor = require('./controlAsesor');
const controlDefensor = require('./controlDefensor');
const controlEmpleado = require('./controlEmpleados');
const { Op, literal } = require("sequelize");

/**
 * @abstract Función que permite obtener asesorias por filtro
 * @returns asesorias
 */
const obtenerAsesoriasFiltro = async (filtros) => {
  try {
    // Verificar si el arreglo de filtros tiene al menos una clave
    const filtroKeys = Object.keys(filtros);
    if (filtroKeys.length === 0) {
      throw new Error("El arreglo de filtros debe contener al menos una clave.");
    }
    if (filtroKeys.length > 6) {
      throw new Error("El arreglo de filtros no debe contener más de seis claves.");
    }

    // Verificar que las claves sean las esperadas
    const clavesEsperadas = ['fecha-inicio', 'fecha-final','id_defensor', 'id_municipio', 'id_zona','id_asesor'];
    const clavesInvalidas = filtroKeys.filter(key => !clavesEsperadas.includes(key));
    if (clavesInvalidas.length > 0) {
      throw new Error(`Claves inválidas en el arreglo de filtros: ${clavesInvalidas.join(', ')}`);
    }


    const whereClause = {};

    //if (filtros.fecha_registro) {
    //  whereClause.fecha_registro = filtros.fecha_registro;
    //} else 
    
    if (filtros['fecha-inicio'] && filtros['fecha-final']) {
      whereClause.fecha_registro = {
        [Op.between]: [filtros['fecha-inicio'], filtros['fecha-final']],
      };
    }
    if (filtros.id_asesor && filtros.id_defensor) {
      whereClause[Op.or] = [
        { id_empleado: filtros.id_asesor },
        { id_empleado: filtros.id_defensor },
      ];
    }else if(filtros.id_asesor){
      whereClause.id_empleado = filtros.id_asesor;
    }else if(filtros.id_defensor){
      whereClause.id_empleado = filtros.id_defensor;
    }
  
    if (filtros.id_municipio) {
      // Asegúrate de que la relación entre Empleado y Municipio esté definida
      // y ajusta el nombre del modelo y la clave foránea según sea necesario
      whereClause['$empleado.distrito_judicial.id_municipio_distrito$'] = filtros.id_municipio;
    }

    if (filtros.id_zona) {
      // Asegúrate de que la relación entre Empleado y Zona esté definida
      // y ajusta el nombre del modelo y la clave foránea según sea necesario
      whereClause['$empleado.distrito_judicial.id_zona$'] = filtros.id_zona;
    }
    // Resto del código...

    const asesorias_pre = await modeloAsesoria.Asesoria.findAll({
      raw: false,
      nest: true,
      attributes: {
        exclude: ['id_asesorado', 'id_turno', 'id_tipo_juicio']
      },
      include: [{
        model: modeloAsesoria.Asesorado,
      },
      {
        model: modeloAsesoria.DetalleAsesoriaCatalogo,
      },
      {
        model: modeloAsesoria.Turno,
      },
      {
        model: modeloAsesoria.Empleado,
        include: [{
          model: modeloAsesoria.DistritoJudicial,
        }]
      },
      {
        model: modeloAsesoria.TipoJuicio,
      }
      ],
      where: whereClause,
    });

    const asesorias = [];

    for (const asesoria_pre of asesorias_pre) {
      console.log(JSON.stringify(asesoria_pre));
      const asesoria_obj = JSON.parse(JSON.stringify(asesoria_pre));
      delete asesoria_obj.id_empleado;

      if (asesoria_obj.detalle_asesorias_catalogos.length > 0) {
        const recibidos = [];
        for (const detalle of asesoria_obj.detalle_asesorias_catalogos) {
          const id_catalogo = detalle.id_catalogo;
          const catalogo = await controlCatalogoRequisito.obtenerCatalogoRequisitoPorId(id_catalogo);
          recibidos.push(catalogo);
        }
        delete asesoria_obj.detalle_asesorias_catalogos;
        asesoria_obj.recibidos = recibidos;
      }

      // Add other data processing steps similar to obtenerAsesoriaPorIdAsesorado here
      const tipo_empleado = asesoria_obj.empleado.tipo_empleado;
      if (tipo_empleado === "asesor") {
        const id_empleado = asesoria_obj.empleado.id_empleado;
        const asesor = await controlAsesor.obtenerAsesorPorId(id_empleado);
        asesoria_obj.asesor = asesor;
        delete asesoria_obj.empleado;
      } else if (tipo_empleado === "defensor") {
        const id_empleado = asesoria_obj.empleado.id_empleado;
        const defensor = await controlDefensor.obtenerDefensorPorId(id_empleado);
        asesoria_obj.defensor = defensor;
        delete asesoria_obj.empleado;
      }
      delete asesoria_obj.empleado;

      //const zona = await controlZonas.obtenerZonaPorId(asesoria_obj.asesor.id_zona);
      //  delete asesoria_obj.asesor.id_zona;
      //      asesoria_obj.asesor.zona = zona;

      const persona = await controlPersonas.obtenerPersonaPorId(asesoria_obj.asesorado.id_asesorado);
      asesoria_obj.persona = persona;

      if (asesoria_obj.asesorado.id_motivo !== null) {
        const motivo = await controlMotivo.obtenerMotivoPorId(asesoria_obj.asesorado.id_motivo);
        delete asesoria_obj.asesorado.id_motivo;
        asesoria_obj.asesorado.motivo = motivo;
      }

      const estado_civil = await controlEstadoCivil.obtenerEstadoCivilPorId(asesoria_obj.asesorado.id_estado_civil);
      delete asesoria_obj.asesorado.id_estado_civil;
      asesoria_obj.asesorado.estado_civil = estado_civil;
      const datos_asesoria = {};
      datos_asesoria.id_asesoria = asesoria_obj.id_asesoria;
      datos_asesoria.resumen_asesoria = asesoria_obj.resumen_asesoria;
      datos_asesoria.conclusion_asesoria = asesoria_obj.conclusion_asesoria;
      datos_asesoria.estatus_requisitos = asesoria_obj.estatus_requisitos;
      datos_asesoria.fecha_registro = asesoria_obj.fecha_registro;
      datos_asesoria.usuario = asesoria_obj.usuario;
      delete asesoria_obj.id_asesoria;
      delete asesoria_obj.resumen_asesoria;
      delete asesoria_obj.conclusion_asesoria;
      delete asesoria_obj.estatus_requisitos;
      delete asesoria_obj.fecha_registro;
      delete asesoria_obj.usuario;
      asesoria_obj.datos_asesoria = datos_asesoria;

      asesorias.push(asesoria_obj);
    }

    return asesorias;
  } catch (error) {
    throw new Error(`Error al consultar las asesorías: ${error.message}`);
  }
};

/**
 *  @abstract Función que permite obtener todos los asesorias 
 * @returns asesorias
 */
const obtenerAsesorias = async () => {
  try {
    const asesorias_pre = await modeloAsesoria.Asesoria.findAll({
      raw: false,
      nest: true,
      attributes: {
        exclude: ['id_asesorado', 'id_turno', 'id_tipo_juicio']
      },
      include: [
        modeloAsesoria.Asesorado,
        modeloAsesoria.DetalleAsesoriaCatalogo,
        modeloAsesoria.Turno,
        modeloAsesoria.Empleado,
        modeloAsesoria.TipoJuicio
      ]
    });

    const asesorias = [];

    for (const asesoria_pre of asesorias_pre) {
      const asesoria_obj = JSON.parse(JSON.stringify(asesoria_pre));
      delete asesoria_obj.id_empleado;

      if (asesoria_obj.detalle_asesorias_catalogos.length > 0) {
        const recibidos = [];
        for (const detalle of asesoria_obj.detalle_asesorias_catalogos) {
          const id_catalogo = detalle.id_catalogo;
          const catalogo = await controlCatalogoRequisito.obtenerCatalogoRequisitoPorId(id_catalogo);
          recibidos.push(catalogo);
        }
        delete asesoria_obj.detalle_asesorias_catalogos;
        asesoria_obj.recibidos = recibidos;
      }

      // Add other data processing steps similar to obtenerAsesoriaPorIdAsesorado here
      const tipo_empleado = asesoria_obj.empleado.tipo_empleado;
      if (tipo_empleado === "asesor") {
        const id_empleado = asesoria_obj.empleado.id_empleado;
        const asesor = await controlAsesor.obtenerAsesorPorId(id_empleado);
        asesoria_obj.asesor = asesor;
        delete asesoria_obj.empleado;
      } else if (tipo_empleado === "defensor") {
        const id_empleado = asesoria_obj.empleado.id_empleado;
        const defensor = await controlDefensor.obtenerDefensorPorId(id_empleado);
        asesoria_obj.defensor = defensor;
        delete asesoria_obj.empleado;
      }
      delete asesoria_obj.empleado;

      //const zona = await controlZonas.obtenerZonaPorId(asesoria_obj.asesor.id_zona);
      //  delete asesoria_obj.asesor.id_zona;
      //      asesoria_obj.asesor.zona = zona;

      const persona = await controlPersonas.obtenerPersonaPorId(asesoria_obj.asesorado.id_asesorado);
      asesoria_obj.persona = persona;

      if (asesoria_obj.asesorado.id_motivo !== null) {
        const motivo = await controlMotivo.obtenerMotivoPorId(asesoria_obj.asesorado.id_motivo);
        delete asesoria_obj.asesorado.id_motivo;
        asesoria_obj.asesorado.motivo = motivo;
      }

      const estado_civil = await controlEstadoCivil.obtenerEstadoCivilPorId(asesoria_obj.asesorado.id_estado_civil);
      delete asesoria_obj.asesorado.id_estado_civil;
      asesoria_obj.asesorado.estado_civil = estado_civil;
      const datos_asesoria = {};
      datos_asesoria.id_asesoria = asesoria_obj.id_asesoria;
      datos_asesoria.resumen_asesoria = asesoria_obj.resumen_asesoria;
      datos_asesoria.conclusion_asesoria = asesoria_obj.conclusion_asesoria;
      datos_asesoria.estatus_requisitos = asesoria_obj.estatus_requisitos;
      datos_asesoria.fecha_registro = asesoria_obj.fecha_registro;
      datos_asesoria.usuario = asesoria_obj.usuario;
      delete asesoria_obj.id_asesoria;
      delete asesoria_obj.resumen_asesoria;
      delete asesoria_obj.conclusion_asesoria;
      delete asesoria_obj.estatus_requisitos;
      delete asesoria_obj.fecha_registro;
      delete asesoria_obj.usuario;
      asesoria_obj.datos_asesoria = datos_asesoria;

      asesorias.push(asesoria_obj);
    }

    if (asesorias.length > 0) {
      return asesorias;
    }
    else {
      return null;
    }
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/**
 * @abstract Función que permite obtener un asesoria por su id
 *  @param {*} id id del asesoria
 * @returns asesoria
 *  
 *  */
const obtenerAsesoriaPorId = async (id) => {
  try {
    const asesorias_pre = await modeloAsesoria.Asesoria.findByPk(id, {
      raw: false,
      nest: true,
      attributes: {
        exclude: ['id_asesorado', 'id_turno', 'id_tipo_juicio']
      },
      include: [
        modeloAsesoria.Asesorado,
        modeloAsesoria.DetalleAsesoriaCatalogo,
        modeloAsesoria.Turno,
        modeloAsesoria.Empleado,
        modeloAsesoria.TipoJuicio
      ]
    });



    const asesoria_obj = JSON.parse(JSON.stringify(asesorias_pre));
    delete asesoria_obj.id_empleado;

    if (asesoria_obj.detalle_asesorias_catalogos.length > 0) {
      const recibidos = [];
      for (const detalle of asesoria_obj.detalle_asesorias_catalogos) {
        const id_catalogo = detalle.id_catalogo;
        const catalogo = await controlCatalogoRequisito.obtenerCatalogoRequisitoPorId(id_catalogo);
        recibidos.push(catalogo);
      }
      delete asesoria_obj.detalle_asesorias_catalogos;
      asesoria_obj.recibidos = recibidos;
    }

    // Add other data processing steps similar to obtenerAsesoriaPorIdAsesorado here
    const tipo_empleado = asesoria_obj.empleado.tipo_empleado;
    if (tipo_empleado === "asesor") {
      const id_empleado = asesoria_obj.empleado.id_empleado;
      const asesor = await controlAsesor.obtenerAsesorPorId(id_empleado);
      asesoria_obj.asesor = asesor;
      delete asesoria_obj.empleado;
    } else if (tipo_empleado === "defensor") {
      const id_empleado = asesoria_obj.empleado.id_empleado;
      const defensor = await controlDefensor.obtenerDefensorPorId(id_empleado);
      asesoria_obj.defensor = defensor;
      delete asesoria_obj.empleado;
    }


    const persona = await controlPersonas.obtenerPersonaPorId(asesoria_obj.asesorado.id_asesorado);
    asesoria_obj.persona = persona;

    if (asesoria_obj.asesorado.id_motivo !== null) {
      const motivo = await controlMotivo.obtenerMotivoPorId(asesoria_obj.asesorado.id_motivo);
      delete asesoria_obj.asesorado.id_motivo;
      asesoria_obj.asesorado.motivo = motivo;
    }

    const estado_civil = await controlEstadoCivil.obtenerEstadoCivilPorId(asesoria_obj.asesorado.id_estado_civil);
    delete asesoria_obj.asesorado.id_estado_civil;
    asesoria_obj.asesorado.estado_civil = estado_civil;
    const datos_asesoria = {};
    datos_asesoria.id_asesoria = asesoria_obj.id_asesoria;
    datos_asesoria.resumen_asesoria = asesoria_obj.resumen_asesoria;
    datos_asesoria.conclusion_asesoria = asesoria_obj.conclusion_asesoria;
    datos_asesoria.estatus_requisitos = asesoria_obj.estatus_requisitos;
    datos_asesoria.fecha_registro = asesoria_obj.fecha_registro;
    datos_asesoria.usuario = asesoria_obj.usuario;
    delete asesoria_obj.id_asesoria;
    delete asesoria_obj.resumen_asesoria;
    delete asesoria_obj.conclusion_asesoria;
    delete asesoria_obj.estatus_requisitos;
    delete asesoria_obj.fecha_registro;
    delete asesoria_obj.usuario;
    asesoria_obj.datos_asesoria = datos_asesoria;


    return asesoria_obj;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};


/**
 * @abstract Función que permite obtener un asesoria por id del asesorado
 * @param {*} id_asesorado id del asesorado
 *  @returns asesoria
 * */
const obtenerAsesoriaPorIdAsesorado = async (id_asesorado) => {

  try {
    const asesoria_pre = await modeloAsesoria.Asesoria.findOne({
      where: { id_asesorado: id_asesorado },
      raw: false,
      nest: true,
      attributes: {
        exclude: ['id_asesorado', 'id_turno', 'id_tipo_juicio']
      },
      include: [
        modeloAsesoria.Asesorado,
        modeloAsesoria.Empleado,
        modeloAsesoria.DetalleAsesoriaCatalogo,
        modeloAsesoria.Turno,
        modeloAsesoria.TipoJuicio
      ]
    });

    //Separacion 
    const asesoria_str = JSON.stringify(asesoria_pre);
    const asesoria_obj = JSON.parse(asesoria_str);
    delete asesoria_obj.id_empleado;
    //Recibidos
    if (asesoria_obj.detalle_asesorias_catalogos.length > 0) {
      const recibidos = [];
      for (const detalle of asesoria_obj.detalle_asesorias_catalogos) {
        const id_catalogo = detalle.id_catalogo;
        const catalogo = await controlCatalogoRequisito.obtenerCatalogoRequisitoPorId(id_catalogo);
        recibidos.push(catalogo);
      }
      delete asesoria_obj.detalle_asesorias_catalogos;
      asesoria_obj.recibidos = recibidos;
    }

    //datos_asesoria
    const datos_asesoria = {
      id_asesoria: asesoria_obj.id_asesoria,
      resumen_asesoria: asesoria_obj.resumen_asesoria,
      conclusion_asesoria: asesoria_obj.conclusion_asesoria,
      estatus_requisitos: asesoria_obj.estatus_requisitos,
      fecha_registro: asesoria_obj.fecha_registro,
      usuario: asesoria_obj.usuario
    }
    delete asesoria_obj.id_asesoria;
    delete asesoria_obj.resumen_asesoria;
    delete asesoria_obj.conclusion_asesoria;
    delete asesoria_obj.estatus_requisitos;
    delete asesoria_obj.fecha_registro;
    delete asesoria_obj.usuario;
    asesoria_obj.datos_asesoria = datos_asesoria;
    //Asesor
    // Add other data processing steps similar to obtenerAsesoriaPorIdAsesorado here
    const tipo_empleado = asesoria_obj.empleado.tipo_empleado;
    if (tipo_empleado === "asesor") {
      const id_empleado = asesoria_obj.empleado.id_empleado;
      const asesor = await controlAsesor.obtenerAsesorPorId(id_empleado);
      asesoria_obj.asesor = asesor;
      delete asesoria_obj.empleado;
    } else if (tipo_empleado === "defensor") {
      const id_empleado = asesoria_obj.empleado.id_empleado;
      const defensor = await controlDefensor.obtenerDefensorPorId(id_empleado);
      asesoria_obj.defensor = defensor;
      delete asesoria_obj.empleado;
    }
    delete asesoria_obj.empleado;

    //Persona
    const persona = await controlPersonas.obtenerPersonaPorId(asesoria_obj.asesorado.id_asesorado);
    asesoria_obj.persona = persona;
    //Asesorado

    if (asesoria_obj.asesorado.id_motivo !== null) {
      const motivo = await controlMotivo.obtenerMotivoPorId(asesoria_obj.asesorado.id_motivo)
      delete asesoria_obj.asesorado.id_motivo;
      asesoria_obj.asesorado.motivo = motivo;
    }
    const estado_civil = await controlEstadoCivil.obtenerEstadoCivilPorId(asesoria_obj.asesorado.id_estado_civil);
    delete asesoria_obj.asesorado.id_estado_civil;
    asesoria_obj.asesorado.estado_civil = estado_civil;

    return asesoria_obj;
  } catch (error) {
    return null;
  }
};



/**
 * @abstract Función que permite agregar un asesoria
 * @param {*} asesoria asesoria a agregar
 * @returns asesoria si se agrega correctamente, false si no  agregar
 * */
const agregarAsesoria = async (asesoria_pre) => {
  try {
    const asesoria_str = JSON.stringify(asesoria_pre);
    const asesoria_obj = JSON.parse(asesoria_str);


    //Persona
    const persona = asesoria_obj.persona;
    const domicilio_pre = await controlDomicilios.agregarDomicilio(persona.domicilio);
    const domicilio_str = JSON.stringify(domicilio_pre);
    const domicilio_obj = JSON.parse(domicilio_str);
    delete persona.domicilio;
    persona.id_domicilio = domicilio_obj.id_domicilio;
    persona.id_genero = persona.genero.id_genero;
    delete persona.genero;
    const persona_pre = await controlPersonas.agregarPersona(persona);


    //Asesorado
    const asesorado = asesoria_obj.asesorado;
    asesorado.id_estado_civil = asesorado.estado_civil.id_estado_civil;
    delete asesorado.estado_civil;
    asesorado.id_asesorado = persona_pre.id_persona;
    if (asesorado.motivo !== null) {
      asesorado.id_motivo = asesorado.motivo.id_motivo;
      delete asesorado.motivo;

    }
    const asesorado_pre = await controlAsesorados.agregarAsesorado(asesorado)


    const empleado = asesoria_obj.empleado;
    const datos_asesoria = asesoria_obj.datos_asesoria;
    datos_asesoria.id_asesorado = asesorado_pre.id_asesorado;
    datos_asesoria.id_empleado = empleado.id_empleado;
    /*
      const turno = asesoria_obj.turno;
        if (turno !== null) {
          const turno_pre = await controlTurnos.agregarTurno(turno);
          datos_asesoria.id_turno = turno_pre.id_turno;
        }
      */
    const tipojuicio = asesoria_obj.tipos_juicio;
    datos_asesoria.id_tipo_juicio = tipojuicio.id_tipo_juicio;
    const asesoria_cre = (await modeloAsesoria.Asesoria.create(datos_asesoria, { raw: true, nest: true })).dataValues;
    const asesoria_str2 = JSON.stringify(asesoria_cre);
    const asesoria_obj2 = JSON.parse(asesoria_str2);

    const recibidos = asesoria_obj.recibidos;
    if (recibidos.length > 0) {
      for (const elemento of recibidos) {
        elemento.id_asesoria = asesoria_obj2.id_asesoria;
        await controlDetalleAsesoria.agregarDetalleAsesoriaCatalogo(elemento);
      }
    }
    return await obtenerAsesoriaPorIdAsesorado(asesoria_obj2.id_asesorado);
    //return asesoria_obj2;
    //    return (await modeloAsesoria.Asesoria.create(asesoria, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite eliminar un asesoria
 * @param {*} id id del asesoria a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 * */
const eliminarAsesoria = async (id) => {
  try {
    await modeloAsesoria.Asesoria.destroy({ where: { id_asesoria: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite actualizar un asesoria
 * @param {*} asesoria asesoria a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 * */
const actualizarAsesoria = async (asesoria_pre) => {
  //Falta verificar
  try {
    const asesoria_str = JSON.stringify(asesoria_pre);
    const asesoria_obj = JSON.parse(asesoria_str);

    const persona = asesoria_obj.persona;
    const domicilio_pre = await controlDomicilios.actualizarDomicilio(persona.domicilio);
    persona.id_domicilio = domicilio_pre.id_domicilio;
    persona.id_genero = persona.genero.id_genero;
    delete persona.genero;
    delete persona.domicilio;
    const persona_pre = await controlPersonas.actualizarPersona(persona);

    const asesorado = asesoria_obj.asesorado;
    asesorado.id_estado_civil = asesorado.estado_civil.id_estado_civil;
    delete asesorado.estado_civil;
    const asesorado_pre = await controlAsesorados.actualizarAsesorado(asesorado);

    const datos_asesoria = asesoria_obj.datos_asesoria;
    datos_asesoria.id_asesorado = asesorado_pre.id_asesorado;
    datos_asesoria.id_empleado = asesoria_obj.empleado.id_empleado;
    datos_asesoria.id_tipo_juicio = asesoria_obj.tipos_juicio.id_tipo_juicio;

    if (asesoria_obj.hasOwnProperty("turno")) {
      if (typeof asesoria_obj.turno === "object" && Object.keys(asesoria_obj.turno).length > 0) {
        const turno = await controlTurnos.agregarTurno(asesoria_obj.turno);
        datos_asesoria.id_turno = turno.id_turno;
      }
    }

    const asesoria_cre = (await modeloAsesoria.Asesoria.update(datos_asesoria, { where: { id_asesoria: datos_asesoria.id_asesoria } }));
    return await obtenerAsesoriaPorIdAsesorado(datos_asesoria.id_asesorado);
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};



//Funcion que te regrese una lista de asesorias por asi decirlo si te envian el numero 1 como paramtro te regrese las primeras 10 asesorias, y se te envia el dos que te envie las otras 10 y asi sucesivamente

const obtenerAsesoriasPorPagina = async (pageNumber) => {
  try {
    // const total = await modeloAsesoria.Asesoria.count();
    const page = pageNumber || 1; // Página actual, predeterminada: 1
    const pageSize = 10; // Cantidad de productos por página
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const asesorias_pre = await modeloAsesoria.Asesoria.findAll({
      raw: false,
      nest: true,
      attributes: {
        exclude: ['id_asesorado', 'id_turno', 'id_tipo_juicio']
      },
      include: [
        modeloAsesoria.Asesorado,
        modeloAsesoria.DetalleAsesoriaCatalogo,
        modeloAsesoria.Turno,
        modeloAsesoria.Empleado,
        modeloAsesoria.TipoJuicio
      ],
      where: {
        id_asesoria: { [Sequelize.Op.not]: null } // Excluir registros eliminados
      },
      offset: offset,
      limit: limit
    });

    const asesorias = [];

    for (const asesoria_pre of asesorias_pre) {
      const asesoria_obj = JSON.parse(JSON.stringify(asesoria_pre));
      delete asesoria_obj.id_empleado;

      if (asesoria_obj.detalle_asesorias_catalogos.length > 0) {
        const recibidos = [];
        for (const detalle of asesoria_obj.detalle_asesorias_catalogos) {
          const id_catalogo = detalle.id_catalogo;
          const catalogo = await controlCatalogoRequisito.obtenerCatalogoRequisitoPorId(id_catalogo);
          recibidos.push(catalogo);
        }
        delete asesoria_obj.detalle_asesorias_catalogos;
        asesoria_obj.recibidos = recibidos;
      }

      // Add other data processing steps similar to obtenerAsesoriaPorIdAsesorado here
      const tipo_empleado = asesoria_obj.empleado.tipo_empleado;
      if (tipo_empleado === "asesor") {
        const id_empleado = asesoria_obj.empleado.id_empleado;
        const asesor = await controlAsesor.obtenerAsesorPorId(id_empleado);
        asesoria_obj.asesor = asesor;
        delete asesoria_obj.empleado;
      } else if (tipo_empleado === "defensor") {
        const id_empleado = asesoria_obj.empleado.id_empleado;
        const defensor = await controlDefensor.obtenerDefensorPorId(id_empleado);
        asesoria_obj.defensor = defensor;
        delete asesoria_obj.empleado;
      }
      delete asesoria_obj.empleado;

      //const zona = await controlZonas.obtenerZonaPorId(asesoria_obj.asesor.id_zona);
      //  delete asesoria_obj.asesor.id_zona;
      //      asesoria_obj.asesor.zona = zona;

      const persona = await controlPersonas.obtenerPersonaPorId(asesoria_obj.asesorado.id_asesorado);
      asesoria_obj.persona = persona;

      if (asesoria_obj.asesorado.id_motivo !== null) {
        const motivo = await controlMotivo.obtenerMotivoPorId(asesoria_obj.asesorado.id_motivo);
        delete asesoria_obj.asesorado.id_motivo;
        asesoria_obj.asesorado.motivo = motivo;
      }

      const estado_civil = await controlEstadoCivil.obtenerEstadoCivilPorId(asesoria_obj.asesorado.id_estado_civil);
      delete asesoria_obj.asesorado.id_estado_civil;
      asesoria_obj.asesorado.estado_civil = estado_civil;
      const datos_asesoria = {};
      datos_asesoria.id_asesoria = asesoria_obj.id_asesoria;
      datos_asesoria.resumen_asesoria = asesoria_obj.resumen_asesoria;
      datos_asesoria.conclusion_asesoria = asesoria_obj.conclusion_asesoria;
      datos_asesoria.estatus_requisitos = asesoria_obj.estatus_requisitos;
      datos_asesoria.fecha_registro = asesoria_obj.fecha_registro;
      datos_asesoria.usuario = asesoria_obj.usuario;
      delete asesoria_obj.id_asesoria;
      delete asesoria_obj.resumen_asesoria;
      delete asesoria_obj.conclusion_asesoria;
      delete asesoria_obj.estatus_requisitos;
      delete asesoria_obj.fecha_registro;
      delete asesoria_obj.usuario;
      asesoria_obj.datos_asesoria = datos_asesoria;

      asesorias.push(asesoria_obj);
    }
    if (asesorias.length > 0) {
      return asesorias;
    }
    else {
      return null;
    }
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};



/**
 * @abstract Función que permite obtener asesorias por ids de los asesorados
 * @param {*} id_asesorado id de los asesorados
 *  @returns asesorias
 * */
const obtenerAsesoriaPorIdAsesorados = async (ids_asesorados) => {

  try {
    //Recorre el arreglo ids_asesorados y manda a llamar la funcion obtenerAsesoriaPorIdAsesorado y retorna un arreglo de asesorias con todos las asesorias de los asesorados
    const asesorias = [];
    for (const id_asesorado of ids_asesorados) {
      const asesoria = await obtenerAsesoriaPorIdAsesorado(id_asesorado);
      asesorias.push(asesoria);
    }
    if (asesorias.length > 0) {
      return asesorias;
    }
    else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
const Sequelize = require('sequelize');


/**
 * @abstract Función que permite obtener el total de asesorías por filtro
 * @returns total de asesorías
 */
const obtenerTotalAsesorias = async (filtros) => {
  try {
    // Verificar si el arreglo de filtros tiene al menos una clave
    const filtroKeys = Object.keys(filtros);
    if (filtroKeys.length === 0) {
      throw new Error("El arreglo de filtros debe contener al menos una clave.");
    }
    if (filtroKeys.length > 5) {
      throw new Error("El arreglo de filtros no debe contener más de seis claves.");
    }

    // Verificar que las claves sean las esperadas
    const clavesEsperadas = ['fecha-inicio', 'fecha-final', 'id_asesor', 'id_municipio', 'id_zona','id_defensor'];
    const clavesInvalidas = filtroKeys.filter(key => !clavesEsperadas.includes(key));
    if (clavesInvalidas.length > 0) {
      throw new Error(`Claves inválidas en el arreglo de filtros: ${clavesInvalidas.join(', ')}`);
    }

    const whereClause = {};

    if (filtros['fecha-inicio'] && filtros['fecha-final']) {
      whereClause.fecha_registro = {
        [Op.between]: [filtros['fecha-inicio'], filtros['fecha-final']],
      };
    }
    

    if (filtros.id_asesor || filtros.id_defensor) {
      whereClause.id_empleado = {
        [Op.or]: [
          { id_asesor: filtros.id_asesor },
          { id_defensor: filtros.id_defensor },
        ],
      };
    }
    if (filtros.id_municipio) {
      whereClause['$empleado.distrito_judicial.id_municipio_distrito$'] = filtros.id_municipio;
    }

    if (filtros.id_zona) {
      whereClause['$empleado.distrito_judicial.id_zona$'] = filtros.id_zona;
    }

    const totalAsesorias = await modeloAsesoria.Asesoria.count({
      where: whereClause,
    });

    return totalAsesorias;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
    }
};

/**
 *  @abstract Función que permite obtener el total de asesorías en el sistema
 * @returns total de asesorías
 */
const obtenerTotalAsesoriasSistema = async () => {
  try {
    const totalAsesorias = await modeloAsesoria.Asesoria.count();
    return totalAsesorias;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};



// Export model functions and routes  
module.exports = {
  obtenerAsesoriaPorIdAsesorados,
  obtenerAsesorias,
  obtenerAsesoriaPorId,
  obtenerAsesoriaPorIdAsesorado,
  agregarAsesoria,
  eliminarAsesoria,
  actualizarAsesoria,
  obtenerAsesoriasFiltro,
  obtenerAsesoriasPorPagina
  ,
  obtenerTotalAsesoriasSistema,
  obtenerTotalAsesorias

};
