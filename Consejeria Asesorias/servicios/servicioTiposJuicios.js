
const controlTiposDeJuicio = require('../controles/controlTipoJuicio');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/** Operaciones Basica */

const agregarTipoDeJuicio = asyncError(async (req, res, next) => {
  const result = await controlTiposDeJuicio.agregarTipoDeJuicio(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un tipo de juicio', 400);
    return next(error);
  } else {

    res.status(201).json({
        tipoDeJuicio: result
    });
  }
});


const obtenerTiposDeJuicio = asyncError(async (req, res, next) => {
  const result = await controlTiposDeJuicio.obtenerTiposDeJuicio();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron tipos de juicio', 404);
    return next(error);
  } else {

    res.status(200).json({
        tiposDeJuicio: result
    });
  }
});



const eliminarTipoDeJuicio = asyncError(async (req, res, next) => {
  const result = await controlTiposDeJuicio.eliminarTipoDeJuicio(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar el tipo de juicio', 400);
    return next(error);
  } else {

    res.status(200).json({
        menssage: "El tipo de juicio ha sido eliminado"
    });
  }
});

const actualizarTipoDeJuicio = asyncError(async (req, res, next) => {
  const result = await controlTiposDeJuicio.actualizarTipoDeJuicio(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar el tipo de juicio', 400);
    return next(error);
  } else {
 
    res.status(200).json({
        tipoDeJuicio: req.body
    });
  }
});

const obtenerTipoDeJuicioPorId = asyncError(async (req, res, next) => {
  const result = await controlTiposDeJuicio.obtenerTipoDeJuicioPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el tipo de juicio', 404);
    return next(error);
  } else {

    res.status(200).json({
        tipoDeJuicio: result
    });
  }
});


/** Operaciones Requeridas */

module.exports = {
  agregarTipoDeJuicio,
  obtenerTiposDeJuicio,
  eliminarTipoDeJuicio,
  actualizarTipoDeJuicio,
  obtenerTipoDeJuicioPorId
};