
const modeloTipoJuicio = require('../modelos/modeloTipoJuicio');


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
    const result = await modeloTipoJuicio.TipoJuicio.create(tipoDeJuicio, { raw: true, nest: true });
    return result.id_tipo_juicio;
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

module.exports = {
  obtenerTiposDeJuicio,
  obtenerTipoDeJuicioPorId,
  agregarTipoDeJuicio,
  eliminarTipoDeJuicio,
  actualizarTipoDeJuicio
};