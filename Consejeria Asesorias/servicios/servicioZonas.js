const controlZonas = require('../controles/controlZona');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**
 * @abstract Servicio  que permite agregar una zona
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} zona agregada a la base de datos
 * */
const agregarZona = asyncError(async (req, res, next) => {
  const result = await controlZonas.agregarZona(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar una zona', 400);
    return next(error);
  } else {
 
    res.status(201).json({
        zona: result
    });
  }
});


/**
 * @abstract Servicio  que permite obtener todas las zonas
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} zonas  de la base de datos
 */

const obtenerZonas = asyncError(async (req, res, next) => {
  const result = await controlZonas.obtenerZonas();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron zonas', 404);
    return next(error);
  } else {

    res.status(200).json({
        zonas: result
    });
  }
});

/**
 * @abstract Servicio  que permite eliminar una zona
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} mensaje de confirmación de eliminación de zona
 */

const eliminarZona = asyncError(async (req, res, next) => {
  const result = await controlZonas.eliminarZona(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar la zona', 400);
    return next(error);
  } else {

    res.status(200).json({
        menssage: "La zona ha sido eliminada"
    });
  }
});

/**
 * @abstract Servicio  que permite actualizar una zona
 * @param {Object} req Request
 *  
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} zona actualizada en la base de datos
 */

const actualizarZona = asyncError(async (req, res, next) => {
  const result = await controlZonas.actualizarZona(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar la zona', 400);
    return next(error);
  } else {

    res.status(200).json({
        zona: req.body
    });
  }
});

/**
 * @abstract Servicio  que permite obtener una zona por su id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} zona de la base de datos
 */

const obtenerZonaPorId = asyncError(async (req, res, next) => {
  const result = await controlZonas.obtenerZonaPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener la zona', 404);
    return next(error);
  } else {

    res.status(200).json({
        zona: result
    });
  }
});

//Module exports
module.exports = {
  agregarZona,
  obtenerZonas,
  eliminarZona,
  actualizarZona,
  obtenerZonaPorId
};