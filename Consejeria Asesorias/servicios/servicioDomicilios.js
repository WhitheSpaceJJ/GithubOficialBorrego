const controlDomicilios = require('../controles/controlDomicilio'); // Asegúrate de tener el control de domicilios importado.
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**
 * @abstract Servicio  que permite agregar un domicilio
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} domicilio agregado a la base de datos
 * */
const agregarDomicilio = asyncError(async (req, res, next) => {
  const result = await controlDomicilios.agregarDomicilio(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un domicilio', 400);
    return next(error);
  } else {

    res.status(201).json({
        domicilio: result
    });
  }
});

/**
 * @abstract Servicio  que permite obtener todos los domicilios
 * @param {Object} req Request
 *  @param {Object} res Response
 * @param {Object} next Next  
 * @returns {Object} domicilios de la base de datos
 */
const obtenerDomicilios = asyncError(async (req, res, next) => {
  const result = await controlDomicilios.obtenerDomicilios();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron domicilios', 404);
    return next(error);
  } else {

    res.status(200).json({
        domicilios: result
    });
  }
});

/**
 * @abstract Servicio  que permite eliminar un domicilio
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} mensaje de confirmación de eliminación de domicilio
 */
const eliminarDomicilio = asyncError(async (req, res, next) => {
  const result = await controlDomicilios.eliminarDomicilio(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar el domicilio', 400);
    return next(error);
  } else {

    res.status(200).json({
        message: "El domicilio ha sido eliminado"
    });
  }
});

/**
 * @abstract Servicio  que permite actualizar un domicilio
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} domicilio actualizado en la base de datos
 */
const actualizarDomicilio = asyncError(async (req, res, next) => {
  const result = await controlDomicilios.actualizarDomicilio(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar el domicilio', 400);
    return next(error);
  } else {

    res.status(200).json({
        domicilio: req.body
    });
  }
});

/**
 * @abstract Servicio  que permite obtener un domicilio por id
 *  @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} domicilio de la base de datos
 */
const obtenerDomicilioPorId = asyncError(async (req, res, next) => {
  const result = await controlDomicilios.obtenerDomicilioPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el domicilio', 404);
    return next(error);
  } else {

    res.status(200).json({
        domicilio: result
    });
  }
});

//Module exports
module.exports = {
  agregarDomicilio,
  obtenerDomicilios,
  eliminarDomicilio,
  actualizarDomicilio,
  obtenerDomicilioPorId
};
