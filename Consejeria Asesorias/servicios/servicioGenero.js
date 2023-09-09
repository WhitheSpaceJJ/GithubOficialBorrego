const controlGeneros = require('../controles/controlGenero');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");
/** Operaciones Basica */



const agregarGenero = asyncError(async (req, res, next) => {
  const result = await controlGeneros.agregarGenero(req.body);
  if (typeof result === false) {
    const error = new CustomeError('Error al agregar un género', 400);
    return next(error);
  } else {
    const { descripcion_genero } = req.body;
    res.status(201).json({
      status: 'success',
      data: {
        genero: {
          id_genero: result.id,
          descripcion_genero: descripcion_genero
        }
      }
    });
  }
});

const obtenerGeneros = asyncError(async (req, res, next) => {
  const result = await controlGeneros.obtenerGeneros();
  if (typeof result === null) {
    const error = new CustomeError('No se encontraron géneros', 404);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        generos: result
      }
    });
  }
});

const eliminarGenero = asyncError(async (req, res, next) => {
  const result = await controlGeneros.eliminarGenero(req.params.id);
  if (typeof result === false) {
    const error = new CustomeError('Error al eliminar el género', 400);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        genero: result
      }
    });
  }
});

const actualizarGenero = asyncError(async (req, res, next) => {
  const result = await controlGeneros.actualizarGenero(req.body);
  if (typeof result === false) {
    const error = new CustomeError('Error al actualizar el género', 400);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        genero: req.body
      }
    });
  }
});

const obtenerGeneroPorId = asyncError(async (req, res, next) => {
  const result = await controlGeneros.obtenerGeneroPorId(req.params.id);
  if (typeof result === null) {
    const error = new CustomeError('Error al obtener el género', 404);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        genero: result
      }
    });
  }
});


/** Operaciones Requeridas */

module.exports = {
  agregarGenero,
  obtenerGeneros,
  eliminarGenero,
  actualizarGenero,
  obtenerGeneroPorId
};