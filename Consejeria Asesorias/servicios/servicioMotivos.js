const controlMotivos = require('../controles/controlMotivo');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");
/** Operaciones Basica */



const agregarMotivo = asyncError(async (req, res, next) => {
  const result = await controlMotivos.agregarMotivo(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un motivo', 400);
    return next(error);
  } else {

    res.status(201).json({
        motivo: result
    });
  }
});

const obtenerMotivos = asyncError(async (req, res, next) => {
  const result = await controlMotivos.obtenerMotivos();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron motivos', 404);
    return next(error);
  } else {

    res.status(200).json({
        motivos: result
    });
  }
});

const eliminarMotivo = asyncError(async (req, res, next) => {
  const result = await controlMotivos.eliminarMotivo(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar el motivo', 400);
    return next(error);
  } else {

    res.status(200).json({
        menssage: "El motivo ha sido eliminado"
    });
  }
});

const actualizarMotivo = asyncError(async (req, res, next) => {
  const result = await controlMotivos.actualizarMotivo(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar el motivo', 400);
    return next(error);
  } else {
    res.status(200).json({
        motivo: req.body
    });
  }
});

const obtenerMotivoPorId = asyncError(async (req, res, next) => {
  const result = await controlMotivos.obtenerMotivoPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el motivo', 404);
    return next(error);
  } else {

    res.status(200).json({
        motivo: result
    });
  }
});

/** Operaciones Requeridas */

module.exports = {
  agregarMotivo,
  obtenerMotivos,
  eliminarMotivo,
  actualizarMotivo,
  obtenerMotivoPorId
};