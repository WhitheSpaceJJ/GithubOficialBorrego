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

const { Op } = require("sequelize");
/**
 * @abstract Función que permite obtener una asesoria por filtro
 * @returns asesoria
 * */
const obtenerAsesoriasFiltro = async (filtros) => {
  try {
    const asesorias = await modeloAsesoria.Asesoria.findAll({
      raw: false,
      nest: false,
      attributes: {
        exclude: ['id_asesorado', 'id_turno', 'id_empleado', 'id_tipo_juicio']
      },
    /*
      include: [
        { model: Asesor },
        { model: Turno },
        { model: DistritoJudicial, include: [{ model: Zona }, { model: MunicipioDistro }] },
        { model: Empleado },
      ],
      */
      where: {
        [Op.and]: [
          filtros.fecha && { fecha_registro: filtros.fecha },
          filtros.id_empleado && { id_empleado: filtros.id_empleado },
        //  filtros.zona && { "$distritoJudicial.zona.nombre_zona$": filtros.zona },
        //  filtros.municipio && { "$distritoJudicial.municipioDistro.nombre_municipio$": filtros.municipio },
        //  filtros.defensor && { "$turno.defensores.nombre_defensor$": filtros.defensor },
       //   filtros.asesor && { "$asesor.nombre_asesor$": filtros.asesor },
        ],
      },
    });
    const asesoria_str = JSON.stringify(asesorias);
    const asesoria_obj = JSON.parse(asesoria_str)
    return asesoria_obj;
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
        exclude: ['id_asesorado', 'id_turno', 'id_empleado', 'id_tipo_juicio']
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
      const tipo_empleado=asesoria_obj.empleado.tipo_empleado;
      if(tipo_empleado==="asesor"){
        const id_empleado=asesoria_obj.empleado.id_empleado;
        const asesor=await controlAsesor.obtenerAsesorPorId(id_empleado);
        asesoria_obj.asesor=asesor;
      }else if(tipo_empleado==="defensor"){
        const id_empleado=asesoria_obj.empleado.id_empleado;
        const defensor=await controlDefensor.obtenerDefensorPorId(id_empleado);
        asesoria_obj.defensor=defensor;
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
        exclude: ['id_asesorado', 'id_turno', 'id_asesor', 'id_tipo_juicio']
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
    const tipo_empleado=asesoria_obj.empleado.tipo_empleado;
    if(tipo_empleado==="asesor"){
      const id_empleado=asesoria_obj.empleado.id_empleado;
      const asesor=await controlAsesor.obtenerAsesorPorId(id_empleado);
      asesoria_obj.asesor=asesor;
    }else if(tipo_empleado==="defensor"){
      const id_empleado=asesoria_obj.empleado.id_empleado;
      const defensor=await controlDefensor.obtenerDefensorPorId(id_empleado);
      asesoria_obj.defensor=defensor;
    }
    delete asesoria_obj.empleado;


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

    const turno = asesoria_obj.turno;
    if (turno !== null) {
      const turno_pre = await controlTurnos.agregarTurno(turno);
      datos_asesoria.id_turno = turno_pre.id_turno;
    }
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
    return asesoria_obj2;
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



/**
 * @abstract Función que permite obtener un asesoria por id del asesorado
 * @param {*} id_asesorado id del asesorado
 *  @returns asesoria
 * */
const obtenerAsesoriaPorIdAsesorado = async (id_asesorado) => {

  try {
    const asesoria_pre = await modeloAsesoria.Asesoria.findOne({
      where: { id_asesorado: id_asesorado },
      raw: true,
      nest: true,
      attributes: {
        exclude: ['id_asesorado', 'id_turno', 'id_empleado', 'id_tipo_juicio']
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
    const asesoria_obj = JSON.parse(asesoria_str)
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
       const tipo_empleado=asesoria_obj.empleado.tipo_empleado;
       if(tipo_empleado==="asesor"){
         const id_empleado=asesoria_obj.empleado.id_empleado;
         const asesor=await controlAsesor.obtenerAsesorPorId(id_empleado);
         asesoria_obj.asesor=asesor;
       }else if(tipo_empleado==="defensor"){
         const id_empleado=asesoria_obj.empleado.id_empleado;
         const defensor=await controlDefensor.obtenerDefensorPorId(id_empleado);
         asesoria_obj.defensor=defensor;
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


// Export model functions and routes  
module.exports = {
  obtenerAsesorias,
  obtenerAsesoriaPorId,
  obtenerAsesoriaPorIdAsesorado,
  agregarAsesoria,
  eliminarAsesoria,
  actualizarAsesoria,
  obtenerAsesoriasFiltro
};
