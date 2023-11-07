const controlDetalleAsesoriaCatalogo = require('../controles/controlDetalleAsesoria');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/** 
 * @abstract Servicio  que permite agregar un detalle de asesoría al catálogo
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} detalle de asesoría agregado al catálogo
 */

const agregarDetalleAsesoriaCatalogo = asyncError(async (req, res, next) => {
  const result = await controlDetalleAsesoriaCatalogo.agregarDetalleAsesoriaCatalogo(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un detalle de asesoría al catálogo', 400);
    return next(error);
  } else {

    res.status(201).json({
        detalle: result
    });
   
  }
});

/**
 *  @abstract Servicio  que permite obtener todos los detalles de asesoría del catálogo
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} detalles de asesoría del catálogo de la base de datos
 */

const obtenerDetallesAsesoriaCatalogo = asyncError(async (req, res, next) => {
  const result = await controlDetalleAsesoriaCatalogo.obtenerDetallesAsesoriaCatalogo();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron detalles de asesoría en el catálogo', 404);
    return next(error);
  } else {

    res.status(200).json({
        detalles: result
    });
  }
});

/**
 *  @abstract Servicio  que permite eliminar un detalle de asesoría del catálogo
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} mensaje de confirmación de eliminación de detalle de asesoría del catálogo
 */
const eliminarDetalleAsesoriaCatalogo = asyncError(async (req, res, next) => {
  const result = await controlDetalleAsesoriaCatalogo.eliminarDetalleAsesoriaCatalogo(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar el detalle de asesoría del catálogo', 400);
    return next(error);
  } else {

    res.status(200).json({
        message: "El detalle de asesoría ha sido eliminado"
    });
  }
});

/**
 * @abstract Servicio  que permite actualizar un detalle de asesoría del catálogo
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} detalle de asesoría del catálogo actualizado en la base de datos
 */

const actualizarDetalleAsesoriaCatalogo = asyncError(async (req, res, next) => {
  const result = await controlDetalleAsesoriaCatalogo.actualizarDetalleAsesoriaCatalogo(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar el detalle de asesoría del catálogo', 400);
    return next(error);
  } else {

    res.status(200).json({
        detalle: req.body
    });
  }
});

/**
 * @abstract Servicio  que permite obtener un detalle de asesoría del catálogo por id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} detalle de asesoría del catálogo de la base de datos
 */
const obtenerDetalleAsesoriaCatalogoPorId = asyncError(async (req, res, next) => {
  const result = await controlDetalleAsesoriaCatalogo.obtenerDetalleAsesoriaCatalogoPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el detalle de asesoría del catálogo', 404);
    return next(error);
  } else {

    res.status(200).json({
        detalle: result
    });
  }
});

//Module exports
module.exports = {
  agregarDetalleAsesoriaCatalogo,
  obtenerDetallesAsesoriaCatalogo,
  eliminarDetalleAsesoriaCatalogo,
  actualizarDetalleAsesoriaCatalogo,
  obtenerDetalleAsesoriaCatalogoPorId
};
