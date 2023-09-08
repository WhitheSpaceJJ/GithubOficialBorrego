const modeloEstadoCivil = require('../modelos/modeloEstadoCivil');

const obtenerEstadosCiviles = async () => {
  try {
    return await modeloEstadoCivil.EstadoCivil.findAll({
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerEstadoCivilPorId = async (id) => {
  try {
    return await modeloEstadoCivil.EstadoCivil.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const agregarEstadoCivil = async (estadoCivil) => {
  try {
    const result = await modeloEstadoCivil.EstadoCivil.create(estadoCivil, { raw: true, nest: true });
    return result.id_estado_civil;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const eliminarEstadoCivil = async (id) => {
  try {
    await modeloEstadoCivil.EstadoCivil.destroy({ where: { id_estado_civil: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const actualizarEstadoCivil = async (estadoCivil) => {
  try {
    await modeloEstadoCivil.EstadoCivil.update(estadoCivil, { where: { id_estado_civil: estadoCivil.id_estado_civil } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};


module.exports = {
  obtenerEstadosCiviles,
  obtenerEstadoCivilPorId,
  agregarEstadoCivil,
  eliminarEstadoCivil,
  actualizarEstadoCivil

};