const modeloAsesor = require('../modelos/modeloAsesor');
/**
 * This function retrieves all the Asesor objects from the database.
 * It uses the Asesor model to perform the query.
 * If successful, it returns the data in raw and nested format.
 * If an error occurs, it logs the error message and returns null.
 */
const obtenerAsesores = async () => {
  try {
    // Perform the database query using the Asesor model
    return await modeloAsesor.Asesor.findAll({
      raw: true,
      nest: true,
    });
  } catch (error) {
    // Log the error message
    console.log("Error:", error.message);
    // Return null in case of error
    return null;
  }
};

/**
 * Retrieves an Asesor object from the database based on the provided ID.
 *
 * @param {number} id - The ID of the Asesor object to retrieve.
 * @return {Promise<object|null>} A Promise that resolves to the Asesor object if found, or null if not found.
 */
const obtenerAsesorPorId = async (id) => {
  try {
    return await modeloAsesor.Asesor.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/**
 * Creates a new asesor in the database.
 *
 * @param {Object} asesor - The asesor object to be created.
 * @return {Object} The created asesor object.
 */
const agregarAsesor = async (asesor) => {
  try {
    return (await modeloAsesor.Asesor.create(asesor, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const eliminarAsesor = async (id) => {
  try {
    await modeloAsesor.Asesor.destroy({ where: { id_asesor: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const actualizarAsesor = async (asesor) => {
  try {
    await modeloAsesor.Asesor.update(asesor, { where: { id_asesor: asesor.id_asesor } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/** Operaciones Requeridas */


module.exports = {
  obtenerAsesores,
  obtenerAsesorPorId,
  agregarAsesor,
  eliminarAsesor,
  actualizarAsesor,
};
