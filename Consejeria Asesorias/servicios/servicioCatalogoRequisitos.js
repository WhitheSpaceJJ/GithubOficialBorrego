const controlCatalogoRequisitos = require('../controles/controlCatalogoRequisito');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**
 * @abstract Servicio  que permite agregar un requisito del catálogo
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} requisito del catálogo agregado a la base de datos
 * */
const agregarCatalogoRequisito = asyncError(async (req, res, next) => {
  const result = await controlCatalogoRequisitos.agregarCatalogoRequisito(req.body);
  if ( result === false) {
    const error = new CustomeError('Error al agregar un requisito del catálogo', 400);
    return next(error);
  } else {

    res.status(201).json({
        requisitoCatalogo:result
    });
  }
});

/**
 * @abstract Servicio  que permite obtener todos los requisitos del catálogo
 *  @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} requisitos del catálogo de la base de datos
 */

const obtenerCatalogoRequisitos = asyncError(async (req, res, next) => {
  const result = await controlCatalogoRequisitos.obtenerCatalogoRequisitos();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron requisitos del catálogo', 404);
    return next(error);
  } else {

    res.status(200).json({
        requisitosCatalogo: result
    });
  }
});

/**
 *  @abstract Servicio  que permite eliminar un requisito del catálogo
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} mensaje de confirmación de eliminación de requisito del catálogo
 */
const eliminarCatalogoRequisito = asyncError(async (req, res, next) => {
  const result = await controlCatalogoRequisitos.eliminarCatalogoRequisito(req.params.id);
  if ( result === false) {
    const error = new CustomeError('Error al eliminar el requisito del catálogo', 400);
    return next(error);
  } else {

    res.status(200).json({
      menssage:   'Requisito del catálogo eliminado'
    });
  }
});

/**
 *  @abstract Servicio  que permite actualizar un requisito del catálogo
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} requisito del catálogo actualizado en la base de datos
 */

const actualizarCatalogoRequisito = asyncError(async (req, res, next) => {
  const result = await controlCatalogoRequisitos.actualizarCatalogoRequisito(req.body);
  if ( result === false) {
    const error = new CustomeError('Error al actualizar el requisito del catálogo', 400);
    return next(error);
  } else {

    res.status(200).json({
        requisitoCatalogo: req.body
    });
  }
});

/**
 *  @abstract Servicio  que permite obtener un requisito del catálogo por id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} requisito del catálogo de la base de datos
 */

const obtenerCatalogoRequisitoPorId = asyncError(async (req, res, next) => {
  const result = await controlCatalogoRequisitos.obtenerCatalogoRequisitoPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el requisito del catálogo', 404);
    return next(error);
  } else {

    res.status(200).json({
        requisitoCatalogo: result
    });
  }
});

  //Module exports   
module.exports = {
  agregarCatalogoRequisito,
  obtenerCatalogoRequisitos,
  eliminarCatalogoRequisito,
  actualizarCatalogoRequisito,
  obtenerCatalogoRequisitoPorId
};
