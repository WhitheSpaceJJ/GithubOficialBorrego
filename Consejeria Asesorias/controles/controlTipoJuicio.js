
const modeloTipoJuicio = require('../modelos/modeloTipoJuicio');
/** Operaciones Basica */



const obtenerTiposDeJuicio = async () => {
  try {
    return await modeloTipoJuicio.TipoJuicio.findAll({
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerTipoDeJuicioPorId = async (id) => {
  try {
    return await modeloTipoJuicio.TipoJuicio.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const agregarTipoDeJuicio = async (tipoDeJuicio) => {
  try {
    return (await modeloTipoJuicio.TipoJuicio.create(tipoDeJuicio, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const eliminarTipoDeJuicio = async (id) => {
  try {
    await modeloTipoJuicio.TipoJuicio.destroy({ where: { id_tipo_juicio: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const actualizarTipoDeJuicio = async (tipoDeJuicio) => {
  try {
    await modeloTipoJuicio.TipoJuicio.update(tipoDeJuicio, { where: { id_tipo_juicio: tipoDeJuicio.id_tipo_juicio } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/** Operaciones Requeridas */

module.exports = {
  obtenerTiposDeJuicio,
  obtenerTipoDeJuicioPorId,
  agregarTipoDeJuicio,
  eliminarTipoDeJuicio,
  actualizarTipoDeJuicio
};