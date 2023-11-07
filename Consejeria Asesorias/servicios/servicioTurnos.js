const controlTurnos = require('../controles/controlTurno');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**
 * @abstract Servicio  que permite agregar un turno
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} turno agregado a la base de datos
 * */

const agregarTurno = asyncError(async (req, res, next) => {
  const result = await controlTurnos.agregarTurno(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un turno', 400);
    return next(error);
  } else {

    res.status(201).json({
        turno:result
    });
  }
});

/**
 *   
 * @abstract Servicio  que permite obtener todos los turnos
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} turnos de la base de datos
 */

const obtenerTurnos = asyncError(async (req, res, next) => {
  const result = await controlTurnos.obtenerTurnos();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron turnos', 404);
    return next(error);
  } else {

    res.status(200).json({
        turnos: result
    });
  }
});


/**
 * @abstract Servicio  que permite eliminar un turno
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} mensaje de confirmación de eliminación de turno
 */

const eliminarTurno = asyncError(async (req, res, next) => {
  const result = await controlTurnos.eliminarTurno(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar el turno', 400);
    return next(error);
  } else {

    res.status(200).json({
        menssage: "El turno ha sido eliminado"
    });
  }
});

/**
 * @abstract Servicio  que permite actualizar un turno
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 *  
 * @returns {Object} turno actualizado en la base de datos
 */
const actualizarTurno = asyncError(async (req, res, next) => {
  const result = await controlTurnos.actualizarTurno(req.body);
  if ( result === false) {
    const error = new CustomeError('Error al actualizar el turno', 400);
    return next(error);
  } else {

    res.status(200).json({
        turno: req.body
    });
  }
});

/**
 * @abstract Servicio  que permite obtener un turno por id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} turno de la base de datos
 */

const obtenerTurnoPorId = asyncError(async (req, res, next) => {
  const result = await controlTurnos.obtenerTurnoPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el turno', 404);
    return next(error);
  } else {

    res.status(200).json({
        turno: result
    });
  }
});

//Module exports
module.exports = {
  agregarTurno,
  obtenerTurnos,
  eliminarTurno,
  actualizarTurno,
  obtenerTurnoPorId
};
