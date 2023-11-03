const controlDomicilios = require('../controles/controlDomicilio'); // Asegúrate de tener el control de domicilios importado.
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/** Operaciones Básicas */

const agregarDomicilio = asyncError(async (req, res, next) => {
  const result = await controlDomicilios.agregarDomicilio(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un domicilio', 400);
    return next(error);
  } else {

    res.status(201).json({
        domicilio: result
    });
  }
});

const obtenerDomicilios = asyncError(async (req, res, next) => {
  const result = await controlDomicilios.obtenerDomicilios();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron domicilios', 404);
    return next(error);
  } else {

    res.status(200).json({
        domicilios: result
    });
  }
});

const eliminarDomicilio = asyncError(async (req, res, next) => {
  const result = await controlDomicilios.eliminarDomicilio(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar el domicilio', 400);
    return next(error);
  } else {

    res.status(200).json({
        message: "El domicilio ha sido eliminado"
    });
  }
});

const actualizarDomicilio = asyncError(async (req, res, next) => {
  const result = await controlDomicilios.actualizarDomicilio(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar el domicilio', 400);
    return next(error);
  } else {

    res.status(200).json({
        domicilio: req.body
    });
  }
});

const obtenerDomicilioPorId = asyncError(async (req, res, next) => {
  const result = await controlDomicilios.obtenerDomicilioPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el domicilio', 404);
    return next(error);
  } else {

    res.status(200).json({
        domicilio: result
    });
  }
});

/** Operaciones Requeridas */

module.exports = {
  agregarDomicilio,
  obtenerDomicilios,
  eliminarDomicilio,
  actualizarDomicilio,
  obtenerDomicilioPorId
};
