const modeloZona = require('../modelos/modeloZona');


/**
 *  @abstract Función que permite obtener todas las zonas
 * @returns zonas
 */
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

/** 
 * @abstract Función que permite obtener una zona por su id
 * @param {*} id id de la zona
 * @returns zona
 * */
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

/**
 *  @abstract Función que permite agregar una zona
 * @param {*} zona zona a agregar
 * @returns zona si se agrega correctamente, false si no  agregar
 */
const agregarZona = async (zona) => {
  try {
    return (await modeloZona.Zona.create(zona, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 *  @abstract Función que permite eliminar una zona
 * @param {*} id id de la zona a eliminar
 *  @returns true si se elimina correctamente, false si no se elimina
 */

const eliminarZona = async (id) => {
  try {
    await modeloZona.Zona.destroy({ where: { id_zona: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite actualizar una zona
 * @param {*} zona zona a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 */
const actualizarZona = async (zona) => {
  try {
    await modeloZona.Zona.update(zona, { where: { id_zona: zona.id_zona } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};
//Module exports:
module.exports = {
  obtenerZonas,
  obtenerZonaPorId,
  agregarZona,
  eliminarZona,
  actualizarZona
};