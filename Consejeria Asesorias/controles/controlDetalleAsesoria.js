const modeloDetalleAsesoriaCatalogo = require('../modelos/modeloDetalleAsesoria');

/**
 *  @abstract Función que permite obtener todos los detalles de asesorias
 * @returns detalles de asesorias
 */
const obtenerDetallesAsesoriaCatalogo = async () => {
  try {
    return await modeloDetalleAsesoriaCatalogo.DetalleAsesoriaCatalogo.findAll({
      raw: true,
      nest: true
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/**
 * @abstract Función que permite obtener un detalle de asesoria por su id
 * @param {*} id id del detalle de asesoria
 * @returns detalle de asesoria
 * */
const obtenerDetalleAsesoriaCatalogoPorId = async (id) => {
  try {
    return await modeloDetalleAsesoriaCatalogo.DetalleAsesoriaCatalogo.findByPk(id, {
      raw: true,
      nest: true
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/**
 * @abstract Función que permite agregar un detalle de asesoria
 * @param {*} detalle detalle de asesoria a agregar
 * @returns detalle de asesoria si se agrega correctamente, false si no  agregar
 *  */
const agregarDetalleAsesoriaCatalogo = async (detalle) => {
  try {
    return (await modeloDetalleAsesoriaCatalogo.DetalleAsesoriaCatalogo.create(detalle, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite eliminar un detalle de asesoria
 * @param {*} id id del detalle de asesoria a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 * */
const eliminarDetalleAsesoriaCatalogo = async (id) => {
  try {
    await modeloDetalleAsesoriaCatalogo.DetalleAsesoriaCatalogo.destroy({ where: { id_detalle: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite actualizar un detalle de asesoria
 * @param {*} detalle detalle de asesoria a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 * */
const actualizarDetalleAsesoriaCatalogo = async (detalle) => {
  try {
    await modeloDetalleAsesoriaCatalogo.DetalleAsesoriaCatalogo.update(detalle, { where: { id_detalle: detalle.id_detalle } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

// Module exports:
module.exports = {
  obtenerDetallesAsesoriaCatalogo,
  obtenerDetalleAsesoriaCatalogoPorId,
  agregarDetalleAsesoriaCatalogo,
  eliminarDetalleAsesoriaCatalogo,
  actualizarDetalleAsesoriaCatalogo
};
