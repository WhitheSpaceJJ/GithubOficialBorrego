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

const obtenerAsesorias = async () => {
  try {
    const asesorias_pre = await modeloAsesoria.Asesoria.findAll({
      raw: false,
      nest: true,
      attributes: {
        exclude: ['id_asesorado', 'id_turno', 'id_asesor', 'id_tipo_juicio']
      },
      include: [
        modeloAsesoria.Asesorado,
        modeloAsesoria.DetalleAsesoriaCatalogo,
        modeloAsesoria.Turno,
        modeloAsesoria.Asesor,
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

      const zona = await controlZonas.obtenerZonaPorId(asesoria_obj.asesor.id_zona);
      delete asesoria_obj.asesor.id_zona;
      asesoria_obj.asesor.zona = zona;

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
      const datos_asesoria={};
      datos_asesoria.id_asesoria=asesoria_obj.id_asesoria;
      datos_asesoria.resumen_asesoria=asesoria_obj.resumen_asesoria;
      datos_asesoria.conclusion_asesoria=asesoria_obj.conclusion_asesoria;
      datos_asesoria.estatus_requisitos=asesoria_obj.estatus_requisitos;
      datos_asesoria.fecha_registro=asesoria_obj.fecha_registro;
      datos_asesoria.usuario=asesoria_obj.usuario;
      delete asesoria_obj.id_asesoria;
      delete asesoria_obj.resumen_asesoria;
      delete asesoria_obj.conclusion_asesoria;
      delete asesoria_obj.estatus_requisitos;
      delete asesoria_obj.fecha_registro;
      delete asesoria_obj.usuario;
      asesoria_obj.datos_asesoria=datos_asesoria;
 
      asesorias.push(asesoria_obj);
    }

    return asesorias;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerAsesoriaPorId = async (id) => {
  try {
    return await modeloAsesoria.Asesoria.findByPk(id, {
      raw: false,
      nest: true
      ,
      attributes: {
        exclude: ['id_asesorado', 'id_turno', "id_asesor", "id_tipo_juicio"]
      },
      include: [modeloAsesoria.Asesorado,
      modeloAsesoria.DetalleAsesoriaCatalogo,
      modeloAsesoria.Turno, modeloAsesoria.Asesor, modeloAsesoria.TipoJuicio]

    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};
//const agregarAsesoria = async (asesoria) => {

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


    const asesor = asesoria_obj.asesor;
    const datos_asesoria = asesoria_obj.datos_asesoria;
    datos_asesoria.id_asesorado = asesorado_pre.id_asesorado;
    datos_asesoria.id_asesor = asesor.id_asesor;

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

const eliminarAsesoria = async (id) => {
  try {
    await modeloAsesoria.Asesoria.destroy({ where: { id_asesoria: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

//const actualizarAsesoria = async (asesoria) => {

const actualizarAsesoria = async (asesoria_pre) => {
  try {
    const asesoria_str = JSON.stringify(asesoria_pre);
    const asesoria_obj = JSON.parse(asesoria_str)
    /*Persona
    const persona = asesoria_obj.persona;
    const domicilio_pre = await controlDomicilios.actualizarDomicilio(
      persona.domicilio);
    console.log(domicilio_pre);
    persona.id_domicilio = persona.domicilio.id_domicilio;
    persona.id_genero = persona.genero.id_genero;
    delete persona.genero;
    delete persona.domicilio;
    const persona_pre = await controlPersonas.actualizarPersona(persona);
    console.log(persona_pre);
*/
    /*
        //Asesorado
        const asesorado = asesoria_obj.asesorado;
        asesorado.id_estado_civil = asesorado.estado_civil.id_estado_civil;
        delete asesorado.estado_civil;
        if (asesorado.motivo !== null) {
          const motivo_pre = await controlMotivo.actualizarMotivo(asesorado.motivo);
          console.log(motivo_pre);
          asesorado.id_motivo = asesorado.motivo.id_motivo;
          delete asesorado.motivo;
        }
        const asesorado_pre = await controlAsesorados.actualizarAsesorado(asesorado)
        console.log(asesorado_pre);
    */

    const datos_asesoria = asesoria_obj.datos_asesoria;
    datos_asesoria.id_asesorado = asesoria_obj.asesorado.id_asesorado;
    datos_asesoria.id_asesor = asesoria_obj.asesor.id_asesor;
    datos_asesoria.id_tipo_juicio = asesoria_obj.tipos_juicio.id_tipo_juicio;
    const turno = await controlTurnos.agregarTurno(asesoria_obj.turno);
    datos_asesoria.id_turno = turno.id_turno;
    /*
    const tipojuicio = asesoria_obj.tipos_juicio;
    datos_asesoria.id_tipo_juicio = tipojuicio.id_tipo_juicio;
*/
    const asesoria_cre = (await modeloAsesoria.Asesoria.update(datos_asesoria, { where: { id_asesoria: datos_asesoria.id_asesoria } }));

    /*
    if (asesoria_obj.recibidos.length > 0) {
      const recibidos = [];
      for (const detalle of asesoria_obj.recibidos) {
        if (detalle.hasOwnProperty("descripcion_catalogo")) {
          recibidos.push(detalle);
        } else {
          const catalogo_nue = await controlDetalleAsesoria.agregarDetalleAsesoriaCatalogo(detalle);
          console.log(catalogo_nue);
          const id_catalogo = detalle.id_catalogo;
          const catalogo = await controlCatalogoRequisito.obtenerCatalogoRequisitoPorId(id_catalogo);
          recibidos.push(catalogo);
        }

      }
      delete asesoria_obj.recibidos;
      asesoria_obj.recibidos = recibidos;
    }
*/

    return asesoria_cre;
    //    await modeloAsesoria.Asesoria.update(asesoria, { where: { id_asesoria: asesoria.id_asesoria } });
    // return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};



/** Operaciones Requeridas */
const obtenerAsesoriaPorIdAsesorado = async (id_asesorado) => {
  try {
    const asesoria_pre = await modeloAsesoria.Asesoria.findOne({
      where: { id_asesorado: id_asesorado },
      raw: false,
      nest: true,
      attributes: {
        exclude: ['id_asesorado', 'id_turno', 'id_asesor', 'id_tipo_juicio']
      },
      include: [
        modeloAsesoria.Asesorado,
        modeloAsesoria.Asesor,
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
    const zona = await controlZonas.obtenerZonaPorId(asesoria_obj.asesor.id_zona);
    delete asesoria_obj.asesor.id_zona;
    asesoria_obj.asesor.zona = zona;
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


module.exports = {
  obtenerAsesorias,
  obtenerAsesoriaPorId,
  obtenerAsesoriaPorIdAsesorado,
  agregarAsesoria,
  eliminarAsesoria,
  actualizarAsesoria,
};
