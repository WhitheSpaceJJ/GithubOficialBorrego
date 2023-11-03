const controlTurnos = require('../controles/controlTurno');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");
/** Operaciones Basica */


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

/** Operaciones Requeridas */

module.exports = {
  agregarTurno,
  obtenerTurnos,
  eliminarTurno,
  actualizarTurno,
  obtenerTurnoPorId
};
