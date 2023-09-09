const modeloZona = require('../modelos/modeloZona');

/** Operaciones Basica */


const obtenerZonas = async () => {
  try {
    return await modeloZona.Zona.findAll({
      raw: true,
      nest: true
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};


const obtenerZonaPorId = async (id) => {
  try {
    return await modeloZona.Zona.findByPk(id, {
      raw: true,
      nest: true
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};


const agregarZona = async (zona) => {
  try {
    return (await modeloZona.Zona.create(zona, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const eliminarZona = async (id) => {
  try {
    await modeloZona.Zona.destroy({ where: { id_zona: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const actualizarZona = async (zona) => {
  try {
    await modeloZona.Zona.update(zona, { where: { id_zona: zona.id_zona } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/** Operaciones Requeridas */

module.exports = {
  obtenerZonas,
  obtenerZonaPorId,
  agregarZona,
  eliminarZona,
  actualizarZona
};