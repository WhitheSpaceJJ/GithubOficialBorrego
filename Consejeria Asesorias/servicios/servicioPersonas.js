const controlPersonas = require('../controles/controlPersonas');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**
 * @abstract Servicio  que permite agregar una persona
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} persona agregada a la base de datos
 * */

const agregarPersona = asyncError(async (req, res, next) => {
  const result = await controlPersonas.agregarPersona(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar una persona', 400);
    return next(error);
  } else {

    res.status(201).json({
        persona: result
    });
  }
});

/**
 * @abstract Servicio  que permite obtener todas las personas
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} personas  de la base de datos
 */

const obtenerPersonas = asyncError(async (req, res, next) => {
  const result = await controlPersonas.obtenerPersonas();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron personas', 404);
    return next(error);
  } else {

    res.status(200).json({
        personas: result
    });
  }
});



/**
 *  
 * @abstract Servicio  que permite obtener todas las personas
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} personas  de la base de datos
 */

const obtenerPersonaNombre = asyncError(async (req, res, next) => {
  const { nombre, apellido_materno,apellido_paterno } = req.query;
  const result = await controlPersonas.obtenerPersonaNombre(nombre,apellido_paterno,apellido_materno);
  if (result === null) {
    const error = new CustomeError('Error al obtener la persona', 404);
    return next(error);
  } else {

    res.status(200).json({
        persona: result
    });
  }
});

/**
 * @abstract Servicio  que permite eliminar una persona
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} mensaje de confirmación de eliminación de persona
 */

const eliminarPersona = asyncError(async (req, res, next) => {
  const result = await controlPersonas.eliminarPersona(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar la persona', 400);
    return next(error);
  } else {

    res.status(200).json({
        menssage: "La persona ha sido eliminada"
    });
  }
});

/**
 *  
 * @abstract Servicio  que permite actualizar una persona
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} persona actualizada en la base de datos
 */

const actualizarPersona = asyncError(async (req, res, next) => {
  const result = await controlPersonas.actualizarPersona(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar la persona', 400);
    return next(error);
  } else {

    res.status(200).json({
        persona: req.body
    });
  }
});

/**
 * @abstract Servicio  que permite obtener una persona por su id
 * @param {Object} req Request
 * @param {Object} res Response
 *  
 * @param {Object} next Next
 * @returns {Object} persona de la base de datos
 */

const obtenerPersonaPorId = asyncError(async (req, res, next) => {
  const result = await controlPersonas.obtenerPersonaPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener la persona', 404);
    return next(error);
  } else {

    res.status(200).json({
        persona: result
    });
  }
});

//Module exports
module.exports = {
  agregarPersona,
  obtenerPersonas,
  eliminarPersona,
  actualizarPersona,
  obtenerPersonaPorId,
  obtenerPersonaNombre
};
