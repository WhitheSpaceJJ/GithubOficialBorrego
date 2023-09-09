
const modeloGenero = require('../modelos/modeloGenero');
/** Operaciones Basica */



const obtenerGeneros = async () => {
  try {
    return await modeloGenero.Genero.findAll({
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerGeneroPorId = async (id) => {
  try {
    return await modeloGenero.Genero.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const agregarGenero = async (genero) => {
  try {
    const result = await modeloGenero.Genero.create(genero, { raw: true, nest: true });
    return result.id_genero;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const eliminarGenero = async (id) => {
  try {
    await modeloGenero.Genero.destroy({ where: { id_genero: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const actualizarGenero = async (genero) => {
  try {
    await modeloGenero.Genero.update(genero, { where: { id_genero: genero.id_genero } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};


/** Operaciones Requeridas */

module.exports = {
  obtenerGeneros,
  obtenerGeneroPorId,
  agregarGenero,
  eliminarGenero,
  actualizarGenero
};