const controlMotivos = require('../controles/controlMotivo');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");


/**
 * @abstract Servicio  que permite agregar un motivo
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} motivo agregado a la base de datos
 * */
const agregarMotivo = asyncError(async (req, res, next) => {
  const result = await controlMotivos.agregarMotivo(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un motivo', 400);
    return next(error);
  } else {

    res.status(201).json({
        motivo: result
    });
  }
});


/**
 *  
 *  @abstract Servicio  que permite obtener todos los motivos
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} motivos de la base de datos
 */

const obtenerMotivos = asyncError(async (req, res, next) => {
  const result = await controlMotivos.obtenerMotivos();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron motivos', 404);
    return next(error);
  } else {

    res.status(200).json({
        motivos: result
    });
  }
});

/**
 * @abstract Servicio  que permite eliminar un motivo
 * @param {Object} req Request
 * @param {Object} res Response
 *  @param {Object} next Next
 * @returns {Object} mensaje de confirmación de eliminación de motivo
 */
const eliminarMotivo = asyncError(async (req, res, next) => {
  const result = await controlMotivos.eliminarMotivo(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar el motivo', 400);
    return next(error);
  } else {

    res.status(200).json({
        menssage: "El motivo ha sido eliminado"
    });
  }
});

/**
 * @abstract Servicio  que permite actualizar un motivo
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} motivo actualizado en la base de datos
 */
const actualizarMotivo = asyncError(async (req, res, next) => {
  const result = await controlMotivos.actualizarMotivo(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar el motivo', 400);
    return next(error);
  } else {
    res.status(200).json({
        motivo: req.body
    });
  }
});

/**
 *  @abstract Servicio  que permite obtener un motivo por id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} motivo de la base de datos
 */
const obtenerMotivoPorId = asyncError(async (req, res, next) => {
  const result = await controlMotivos.obtenerMotivoPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el motivo', 404);
    return next(error);
  } else {

    res.status(200).json({
        motivo: result
    });
  }
});

//Module exports
module.exports = {
  agregarMotivo,
  obtenerMotivos,
  eliminarMotivo,
  actualizarMotivo,
  obtenerMotivoPorId
};