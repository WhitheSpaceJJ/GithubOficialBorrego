const controlAsesores = require('../controles/controlAsesor');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**
 * @abstract Servicio  que permite agregar un asesor
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesor  agregado a la base de datos
 *  */ 

const agregarAsesor = asyncError(async (req, res, next) => {
  const result = await controlAsesores.agregarAsesor(req.body);
  if ( result === false) {
    const error = new CustomeError('Error al agregar un asesor', 400);
    return next(error);
  } else {

    res.status(201).json({
        asesor:result
    });
  }
});

/**
 * @abstract Servicio  que permite obtener todos los asesores
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesores   de la base de datos
 */
const obtenerAsesores = asyncError(async (req, res, next) => {
  const result = await controlAsesores.obtenerAsesores();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron asesores', 404);
    return next(error);
  } else {
    res.status(200).json({
     
        asesores: result
    });
  }
});

/**
 *  @abstract Servicio  que permite eliminar un asesor
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} mensajee de confirmación de eliminación de asesor
 */
const eliminarAsesor = asyncError(async (req, res, next) => {
  const result = await controlAsesores.eliminarAsesor(req.params.id);
  if ( result === false) {
    const error = new CustomeError('Error al eliminar el asesor', 400);
    return next(error);
  } else {

    res.status(200).json({
        menssage: "El asesor ha sido eliminado"
    });
  }
});

/**
 *  @abstract Servicio  que permite actualizar un asesor
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesor  actualizado en la base de datos
 */
const actualizarAsesor = asyncError(async (req, res, next) => {
  const result = await controlAsesores.actualizarAsesor(req.body);
  if ( result === false) {
    const error = new CustomeError('Error al actualizar el asesor', 400);
    return next(error);
  } else {
  
    res.status(200).json({
        asesor: req.body
    });
  }
});

/**
 *  @abstract Servicio  que permite obtener un asesor por id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesor  de la base de datos
 */
const obtenerAsesorPorId = asyncError(async (req, res, next) => {
  const result = await controlAsesores.obtenerAsesorPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el asesor', 404);
    return next(error);
  } else {
 
    res.status(200).json({
        asesor: result
    });
  }
});

const obtenerAsesoresZona = asyncError(async (req, res, next) => {
  const result = await controlAsesores.obtenerAsesoresZona(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el asesor', 404);
    return next(error);
  } else {
 
    res.status(200).json({
        asesores: result
    });
  }
}
);
//Module exports  
module.exports = {
  agregarAsesor,
  obtenerAsesores,
  eliminarAsesor,
  actualizarAsesor,
  obtenerAsesorPorId,
  obtenerAsesoresZona
};
