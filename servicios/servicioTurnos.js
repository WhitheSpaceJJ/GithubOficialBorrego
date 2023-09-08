const controlTurnos = require('../controles/controlTurno');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

const agregarTurno = asyncError(async (req, res, next) => {
  const result = await controlTurnos.agregarTurno(req.body);
  if (typeof result === false) {
    const error = new CustomeError('Error al agregar un turno', 400);
    return next(error);
  } else {
    const { fecha_turno, hora_turno } = req.body;
    res.status(201).json({
      status: 'success',
      data: {
        turno: {
          fecha_turno,
          hora_turno
        }
      }
    });
  }
});

const obtenerTurnos = asyncError(async (req, res, next) => {
  const result = await controlTurnos.obtenerTurnos();
  if (typeof result === null) {
    const error = new CustomeError('No se encontraron turnos', 404);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        turnos: result
      }
    });
  }
});

const eliminarTurno = asyncError(async (req, res, next) => {
  const result = await controlTurnos.eliminarTurno(req.params.id);
  if (typeof result === false) {
    const error = new CustomeError('Error al eliminar el turno', 400);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        turno: result
      }
    });
  }
});

const actualizarTurno = asyncError(async (req, res, next) => {
  const result = await controlTurnos.actualizarTurno(req.body);
  if (typeof result === false) {
    const error = new CustomeError('Error al actualizar el turno', 400);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        turno: req.body
      }
    });
  }
});

const obtenerTurnoPorId = asyncError(async (req, res, next) => {
  const result = await controlTurnos.obtenerTurnoPorId(req.params.id);
  if (typeof result === null) {
    const error = new CustomeError('Error al obtener el turno', 404);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        turno: result
      }
    });
  }
});

module.exports = {
  agregarTurno,
  obtenerTurnos,
  eliminarTurno,
  actualizarTurno,
  obtenerTurnoPorId
};
