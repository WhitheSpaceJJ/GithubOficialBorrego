const controlAsesorados = require('../controles/controlAsesorado');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**
 * @abstract Servicio  que permite agregar un asesorado
 *  @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesorado agregado
 */
const agregarAsesorado = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.agregarAsesorado(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un asesorado', 400);
    return next(error);
  } else {

    res.status(201).json({
      asesorado: result
    });

  }
});

/**
 * @abstract Servicio  que permite obtener todos los asesorados
 * @param {Object} req Request
 *  @param {Object} res Response
 * @param {Object} next Next
 *  @returns {Object} asesorados  de la base de datos
 */
const obtenerAsesorados = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.obtenerAsesorados();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron asesorados', 404);
    return next(error);
  } else {

    res.status(200).json({
      asesorados: result
    });
  }
});

/**
 * @abstract Servicio  que permite eliminar un asesorado
 * @param {Object} req Request
 * @param {Object} res Response
 *  @param {Object} next Next
 * @returns {Object} mensaje de confirmación de eliminación de asesorado
 */
const eliminarAsesorado = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.eliminarAsesorado(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar el asesorado', 400);
    return next(error);
  } else {

    res.status(200).json({
      menssage: "El asesorado ha sido eliminado"
    });
  }
});

/**
 * @abstract Servicio  que permite actualizar un asesorado
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesorado  actualizado   
 */
const actualizarAsesorado = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.actualizarAsesorado(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar el asesorado', 400);
    return next(error);
  } else {

    res.status(200).json({
      asesorado: req.body
    });
  }
});

/**
 * @abstract Servicio  que permite obtener un asesorado por su id
 * @param {Object} req Request
 * @param {Object} res Response
 *  @param {Object} next Next
 * @returns {Object} asesorado
 */
const obtenerAsesoradoPorId = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.obtenerAsesoradoPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el asesorado', 404);
    return next(error);
  } else {

    res.status(200).json({
      asesorado: result
    });
  }
});

//Module exports
module.exports = {
  agregarAsesorado,
  obtenerAsesorados,
  eliminarAsesorado,
  actualizarAsesorado,
  obtenerAsesoradoPorId
};
