const modeloAsesoria = require('../modelos/modeloAsesoria');
/** Operaciones Basica */
const controlPersonas = require('./controlPersonas');
const controlZonas = require('./controlZona');
const controlEstadoCivil = require('./controlEstadoCivil');
const controlMotivo = require('./controlMotivo');
const controlCatalogoRequisito = require('./controlCatalogoRequisito');


const obtenerAsesorias = async () => {
  try {
    controlCatalogoRequisito.obtenerCatalogoRequisitoPorId
    return await modeloAsesoria.Asesoria.findAll({
      raw: true,
      nest: true
      ,
      attributes: {
        exclude: ['id_asesorado', 'id_turno', "id_asesor"]
      },
      include: [modeloAsesoria.Asesorado, modeloAsesoria.Turno, modeloAsesoria.Asesor]

    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerAsesoriaPorId = async (id) => {
  try {
    return await modeloAsesoria.Asesoria.findByPk(id, {
      raw: true,
      nest: true
      ,
      attributes: {
        exclude: ['id_asesorado', 'id_turno', "id_asesor"]
      },
      include: [modeloAsesoria.Asesorado, modeloAsesoria.Turno, modeloAsesoria.Asesor]

    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const agregarAsesoria = async (asesoria) => {
  try {
    return (await modeloAsesoria.Asesoria.create(asesoria, { raw: true, nest: true })).dataValues;
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

const actualizarAsesoria = async (asesoria) => {
  try {
    await modeloAsesoria.Asesoria.update(asesoria, { where: { id_asesoria: asesoria.id_asesoria } });
    return true;
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
        exclude: ['id_asesorado', 'id_turno', 'id_asesor']
      },
      include: [
        modeloAsesoria.Asesorado,
        modeloAsesoria.Asesor,
        modeloAsesoria.DetalleAsesoriaCatalogo,
        modeloAsesoria.Turno
      ]
    });
    const asesoria_str = JSON.stringify(asesoria_pre);
    const asesoria = JSON.parse(asesoria_str)
    if (asesoria.detalle_asesorias_catalogos.length > 0) {
      const recibidos = [];
      for (const detalle of asesoria.detalle_asesorias_catalogos) {
        const id_catalogo = detalle.id_catalogo;
        const catalogo = await controlCatalogoRequisito.obtenerCatalogoRequisitoPorId(id_catalogo);
        recibidos.push(catalogo);
      }
      delete asesoria.detalle_asesorias_catalogos;
      asesoria.recibidos = recibidos;
    }
    if (asesoria.turno === null || asesoria.turno === "null") {
      delete asesoria.turno;
    }
    const persona = await controlPersonas.obtenerPersonaPorId(asesoria.asesorado.id_asesorado);
    delete asesoria.asesorado.id_asesorado;
    asesoria.asesorado.persona = persona;
    return asesoria;
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
