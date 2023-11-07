
const controlTiposDeJuicio = require('../controles/controlTipoJuicio');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");


/**
 * @abstract Servicio  que permite agregar un tipo de juicio
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} tipo de juicio agregado a la base de datos
 * */

const agregarTipoDeJuicio = asyncError(async (req, res, next) => {
  const result = await controlTiposDeJuicio.agregarTipoDeJuicio(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un tipo de juicio', 400);
    return next(error);
  } else {

    res.status(201).json({
        tipoDeJuicio: result
    });
  }
});


/**
 *  
 * @abstract Servicio  que permite obtener todos los tipos de juicio
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} tipos de juicio de la base de datos
 */

const obtenerTiposDeJuicio = asyncError(async (req, res, next) => {
  const result = await controlTiposDeJuicio.obtenerTiposDeJuicio();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron tipos de juicio', 404);
    return next(error);
  } else {

    res.status(200).json({
        tiposDeJuicio: result
    });
  }
});



/**
 * @abstract Servicio  que permite eliminar un tipo de juicio
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} mensaje de confirmación de eliminación de tipo de juicio
 */

const eliminarTipoDeJuicio = asyncError(async (req, res, next) => {
  const result = await controlTiposDeJuicio.eliminarTipoDeJuicio(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar el tipo de juicio', 400);
    return next(error);
  } else {

    res.status(200).json({
        menssage: "El tipo de juicio ha sido eliminado"
    });
  }
});

/**
 * @abstract Servicio  que permite actualizar un tipo de juicio
 * @param {Object} req Request
 * @param {Object} res Response
 * 
 *  @param {Object} next Next
 * @returns {Object} tipo de juicio actualizado
 */

const actualizarTipoDeJuicio = asyncError(async (req, res, next) => {
  const result = await controlTiposDeJuicio.actualizarTipoDeJuicio(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar el tipo de juicio', 400);
    return next(error);
  } else {
 
    res.status(200).json({
        tipoDeJuicio: req.body
    });
  }
});

/**
 *  
 * @abstract Servicio  que permite obtener un tipo de juicio por id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} tipo de juicio de la base de datos
 */

const obtenerTipoDeJuicioPorId = asyncError(async (req, res, next) => {
  const result = await controlTiposDeJuicio.obtenerTipoDeJuicioPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el tipo de juicio', 404);
    return next(error);
  } else {

    res.status(200).json({
        tipoDeJuicio: result
    });
  }
});

//Module exports
module.exports = {
  agregarTipoDeJuicio,
  obtenerTiposDeJuicio,
  eliminarTipoDeJuicio,
  actualizarTipoDeJuicio,
  obtenerTipoDeJuicioPorId
};