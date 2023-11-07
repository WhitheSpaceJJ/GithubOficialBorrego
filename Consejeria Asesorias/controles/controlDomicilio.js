const modeloDomicilio = require('../modelos/modeloDomicilio'); // Asegúrate de tener el modelo de domicilios importado.

/**
 * @abstract Función que permite obtener todos los domicilios
 * @returns domicilios
 */
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

/**
 * @abstract Función que permite obtener un domicilio por su id
 * @param {*} id id del domicilio
 * @returns domicilio
 *  */
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

/**
 * @abstract Función que permite agregar un domicilio
 *  @param {*} domicilio domicilio a agregar
 * @returns domicilio si se agrega correctamente, false si no  agregar
 * */
const agregarDomicilio = async (domicilio) => {
  try {
    return (await modeloDomicilio.Domicilio.create(domicilio, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 *  @abstract Función que permite eliminar un domicilio
 * @param {*} id id del domicilio a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 */
const eliminarDomicilio = async (id) => {
  try {
    await modeloDomicilio.Domicilio.destroy({ where: { id_domicilio: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite actualizar un domicilio
 * @param {*} domicilio domicilio a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 */
const actualizarDomicilio = async (domicilio) => {
  try {
    await modeloDomicilio.Domicilio.update(domicilio, { where: { id_domicilio: domicilio.id_domicilio } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 *  @module controlDomicilio
 */
module.exports = {
  obtenerDomicilios,
  obtenerDomicilioPorId,
  agregarDomicilio,
  eliminarDomicilio,
  actualizarDomicilio
};
