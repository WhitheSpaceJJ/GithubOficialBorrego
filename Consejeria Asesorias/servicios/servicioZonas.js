const controlZonas = require('../controles/controlZona');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");
/** Operaciones Basica */

const agregarZona = asyncError(async (req, res, next) => {
  const result = await controlZonas.agregarZona(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar una zona', 400);
    return next(error);
  } else {
 
    res.status(201).json({
        zona: result
    });
  }
});


const obtenerZonas = asyncError(async (req, res, next) => {
  const result = await controlZonas.obtenerZonas();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron zonas', 404);
    return next(error);
  } else {

    res.status(200).json({
        zonas: result
    });
  }
});

const eliminarZona = asyncError(async (req, res, next) => {
  const result = await controlZonas.eliminarZona(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar la zona', 400);
    return next(error);
  } else {

    res.status(200).json({
        menssage: "La zona ha sido eliminada"
    });
  }
});

const actualizarZona = asyncError(async (req, res, next) => {
  const result = await controlZonas.actualizarZona(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar la zona', 400);
    return next(error);
  } else {

    res.status(200).json({
        zona: req.body
    });
  }
});

const obtenerZonaPorId = asyncError(async (req, res, next) => {
  const result = await controlZonas.obtenerZonaPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener la zona', 404);
    return next(error);
  } else {

    res.status(200).json({
        zona: result
    });
  }
});

/** Operaciones Requeridas */

module.exports = {
  agregarZona,
  obtenerZonas,
  eliminarZona,
  actualizarZona,
  obtenerZonaPorId
};