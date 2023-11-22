const controlTipos = require('../controles/controlTipoUsuario');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**
 * @abstract Servicio  que permite agregar un tipo de usuario
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} tipo de usuario agregado a la base de datos
 * */
const agregarTipoUsuario = asyncError(async (req, res, next) => {
  const result = await controlTipos.agregarTipoUsuario(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un tipo de usuario', 400);
    return next(error);
  } else {
    res.status(201).json({
      tipoUsuario: result
    });
  }
}
);


/**
 * @abstract Servicio  que permite obtener todos los tipos de usuario
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} tipos de usuario  de la base de datos
 */

const obtenerTiposUsuario = asyncError(async (req, res, next) => {
  const result = await controlTipos.obtenerTiposUsuario();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron tipos de usuario', 404);
    return next(error);
  } else {
    res.status(200).json({
      tiposUsuario: result
    });
  }
} 
);

/**
 * @abstract Servicio  que permite eliminar un tipo de usuario
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} mensaje de confirmación de eliminación de tipo de usuario
 */

const eliminarTipoUsuario = asyncError(async (req, res, next) => {
  const result = await controlTipos.eliminarTipoUsuario(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar el tipo de usuario', 400);
    return next(error);
  } else {
    res.status(200).json({
      message: 'Tipo de usuario eliminado correctamente'
    });
  }
}
);

/**
 * @abstract Servicio  que permite obtener un tipo de usuario por su id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} tipo de usuario
 */

const obtenerTipoUsuarioPorId = asyncError(async (req, res, next) => {
  const result = await controlTipos.obtenerTipoUsuarioPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontró el tipo de usuario', 404);
    return next(error);
  } else {
    res.status(200).json({
      tipoUsuario: result
    });
  }
}
);

/**
 * @abstract Servicio  que permite actualizar un tipo de usuario
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} tipo de usuario actualizado en la base de datos
 */

const actualizarTipoUsuario = asyncError(async (req, res, next) => {
  const result = await controlTipos.actualizarTipoUsuario(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar el tipo de usuario', 400);
    return next(error);
  } else {
    res.status(200).json({
      tipoUsuario: req.body
    });
  }
}
);

//Module exports
module.exports = {
  agregarTipoUsuario,
  obtenerTiposUsuario,
  eliminarTipoUsuario,
  obtenerTipoUsuarioPorId,
  actualizarTipoUsuario
};
