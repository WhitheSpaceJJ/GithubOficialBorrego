const modeloDomicilio = require('../modelos/modeloDomicilio'); // Asegúrate de tener el modelo de domicilios importado.

/** Operaciones Básicas */

const obtenerDomicilios = async () => {
  try {
    return await modeloDomicilio.Domicilio.findAll({
      raw: true,
      nest: true
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerDomicilioPorId = async (id) => {
  try {
    return await modeloDomicilio.Domicilio.findByPk(id, {
      raw: true,
      nest: true
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const agregarDomicilio = async (domicilio) => {
  try {
    return (await modeloDomicilio.Domicilio.create(domicilio, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const eliminarDomicilio = async (id) => {
  try {
    await modeloDomicilio.Domicilio.destroy({ where: { id_domicilio: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const actualizarDomicilio = async (domicilio) => {
  try {
    await modeloDomicilio.Domicilio.update(domicilio, { where: { id_domicilio: domicilio.id_domicilio } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/** Operaciones Requeridas */

module.exports = {
  obtenerDomicilios,
  obtenerDomicilioPorId,
  agregarDomicilio,
  eliminarDomicilio,
  actualizarDomicilio
};
