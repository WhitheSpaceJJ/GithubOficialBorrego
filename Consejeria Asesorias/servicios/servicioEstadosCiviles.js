const controlEstados = require('../controles/controlEstadoCivil');

const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**
 * @abstract Servicio  que permite agregar un estado civil
 * @param {Object} req Request  
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} estado civil agregado a la base de datos
 * */
const agregarEstadoCivil = asyncError(async (req, res, next) => {
  const result = await controlEstados.agregarEstadoCivil(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un estado civil', 400);
    return next(error);
  } else {

    res.status(201).json({
        estadoCivil:result
    });
  }
});


/**
 * @abstract Servicio  que permite obtener todos los estados civiles
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} estados civiles de la base de datos
 */

const obtenerEstadosCiviles = asyncError(async (req, res, next) => {
  const result = await controlEstados.obtenerEstadosCiviles();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron estados civiles', 404);
    return next(error);
  } else {

    res.status(200).json({
        estadosCiviles: result
    });
  }
});

/**
 *  @abstract Servicio  que permite eliminar un estado civil
 *  @param {Object} req Request
 *  @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} mensaje de confirmación de eliminación de estado civil
 */
const eliminarEstadoCivil = asyncError(async (req, res, next) => {
  const result = await controlEstados.eliminarEstadoCivil(req.params.id);
  if ( result === false) {
    const error = new CustomeError('Error al eliminar el estado civil', 400);
    return next(error);
  } else {

    res.status(200).json({
        menssage: "El estado civil ha sido eliminado"
    });
  }
});

/**
 * @abstract Servicio  que permite actualizar un estado civil
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} estado civil actualizado en la base de datos
 */

const actualizarEstadoCivil = asyncError(async (req, res, next) => {
  const result = await controlEstados.actualizarEstadoCivil(req.body);
  if ( result === false) {
    const error = new CustomeError('Error al actualizar el estado civil', 400);
    return next(error);
  } else {
    res.status(200).json({
        estadoCivil: req.body
    });
  }
});

/**
 * @abstract Servicio  que permite obtener un estado civil por id
 * @param {Object} req Request
 * @param {Object} res Response
 *  @param {Object} next Next
 * @returns {Object} estado civil de la base de datos
 */

const obtenerEstadoCivilPorId = asyncError(async (req, res, next) => {
  const result = await controlEstados.obtenerEstadoCivilPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el estado civil', 404);
    return next(error);
  } else {

    res.status(200).json({
        estadoCivil: result
    });
  }
});

//Module exports
module.exports = {
  agregarEstadoCivil,
  obtenerEstadosCiviles,
  eliminarEstadoCivil,
  actualizarEstadoCivil,
  obtenerEstadoCivilPorId
};