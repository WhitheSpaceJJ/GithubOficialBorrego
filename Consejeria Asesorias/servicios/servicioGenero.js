const controlGeneros = require('../controles/controlGenero');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");


/**
 * @abstract Servicio  que permite agregar un género
 * @param {Object} req Request
 * @param {Object} res Response
 *  @param {Object} next Next
 * @returns {Object} género agregado a la base de datos
 * */
const agregarGenero = asyncError(async (req, res, next) => {
  const result = await controlGeneros.agregarGenero(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un género', 400);
    return next(error);
  } else {

    res.status(201).json({
      genero: result
  });
  }
});

/**
 * @abstract Servicio  que permite obtener todos los géneros
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} géneros de la base de datos
 */
const obtenerGeneros = asyncError(async (req, res, next) => {
  const result = await controlGeneros.obtenerGeneros();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron géneros', 404);
    return next(error);
  } else {

    res.status(200).json({
        generos: result
    });
  }
});

/**
 * @abstract Servicio  que permite eliminar un género
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} mensaje de confirmación de eliminación de género
 */
const eliminarGenero = asyncError(async (req, res, next) => {
  const result = await controlGeneros.eliminarGenero(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar el género', 400);
    return next(error);
  } else {
 
    res.status(200).json({
        menssage: "El genero ha sido eliminado"
    });
  }
});

/**
 * @abstract Servicio  que permite actualizar un género
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} género actualizado en la base de datos
 */
const actualizarGenero = asyncError(async (req, res, next) => {
  const result = await controlGeneros.actualizarGenero(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar el género', 400);
    return next(error);
  } else {

    res.status(200).json({
        genero: req.body
    });
  }
});

/**
 * @abstract Servicio  que permite obtener un género por id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} género de la base de datos
 */

const obtenerGeneroPorId = asyncError(async (req, res, next) => {
  const result = await controlGeneros.obtenerGeneroPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el género', 404);
    return next(error);
  } else {

    res.status(200).json({
        genero: result
    });
  }
});


//Module exports 
module.exports = {
  agregarGenero,
  obtenerGeneros,
  eliminarGenero,
  actualizarGenero,
  obtenerGeneroPorId
};