const controlUsuarios = require('../controles/controlUsuario'); // Cambio de controlZonas a controlUsuarios
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");
const jwtController = require("../utilidades/jwtController");

/** Operaciones Básicas para Usuarios */

const agregarUsuario = asyncError(async (req, res, next) => {
  const result = await controlUsuarios.agregarUsuario(req.body); // Cambio de controlZonas a controlUsuarios
  if (result === false) {
    const error = new CustomeError('Error al agregar un usuario', 400);
    return next(error);
  } else {
    res.status(201).json({
      status: 'success',
      data: {
        usuario: result // Cambio de zona a usuario
      }
    });
  }
});

const obtenerUsuarios = asyncError(async (req, res, next) => {
  const result = await controlUsuarios.obtenerUsuarios(); // Cambio de controlZonas a controlUsuarios
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron usuarios', 404); // Cambio de zonas a usuarios
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        usuarios: result // Cambio de zonas a usuarios
      }
    });
  }
});

const eliminarUsuario = asyncError(async (req, res, next) => {
  const result = await controlUsuarios.eliminarUsuario(req.params.id); // Cambio de controlZonas a controlUsuarios
  if (result === false) {
    const error = new CustomeError('Error al eliminar el usuario', 400); // Cambio de zona a usuario
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        message: "El usuario ha sido eliminado" // Cambio de menssage a message
      }
    });
  }
});

const actualizarUsuario = asyncError(async (req, res, next) => {
  const result = await controlUsuarios.actualizarUsuario(req.body); // Cambio de controlZonas a controlUsuarios
  if (result === false) {
    const error = new CustomeError('Error al actualizar el usuario', 400); // Cambio de zona a usuario
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        usuario: req.body // Cambio de zona a usuario
      }
    });
  }
});

const obtenerUsuarioPorId = asyncError(async (req, res, next) => {
  const result = await controlUsuarios.obtenerUsuarioPorId(req.params.id); // Cambio de controlZonas a controlUsuarios
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el usuario', 404); // Cambio de zona a usuario
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        usuario: result // Cambio de zona a usuario
      }
    });
  }
});
const obtenerUsuarioCorreo = asyncError(async (req, res, next) => {
  const result = await controlUsuarios.obtenerUsuarioCorreo
  (req.query.correo, req.query.password); // Cambio de controlZonas a controlUsuarios
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el usuario', 404); // Cambio de zona a usuario
    return next(error);
  } else {
    const payload = result;
    const secreto = 'osos-carinosos';
    const token = await jwtController.generateToken(payload, secreto);

    res.status(200).json({
      status: 'success',
      data: {
        token: token
      }
    });

  }
});


/** Operaciones Requeridas */

module.exports = {
  agregarUsuario,
  obtenerUsuarios,
  eliminarUsuario,
  actualizarUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarioCorreo
};
