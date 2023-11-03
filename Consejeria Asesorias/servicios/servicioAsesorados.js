const controlAsesorados = require('../controles/controlAsesorado');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/** Operaciones Basica */


const agregarAsesorado = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.agregarAsesorado(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un asesorado', 400);
    return next(error);
  } else {

res.status(201).json({
    asesorado: result
});
   
  }
});

const obtenerAsesorados = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.obtenerAsesorados();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron asesorados', 404);
    return next(error);
  } else {

    res.status(200).json({
        asesorados: result
    });
  }
});

const eliminarAsesorado = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.eliminarAsesorado(req.params.id);
  if ( result === false) {
    const error = new CustomeError('Error al eliminar el asesorado', 400);
    return next(error);
  } else {

    res.status(200).json({
        menssage: "El asesorado ha sido eliminado"
    });
  }
});

const actualizarAsesorado = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.actualizarAsesorado(req.body);
  if ( result === false) {
    const error = new CustomeError('Error al actualizar el asesorado', 400);
    return next(error);
  } else {

    res.status(200).json({
        asesorado: req.body
    });
  }
});

const obtenerAsesoradoPorId = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.obtenerAsesoradoPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el asesorado', 404);
    return next(error);
  } else {

    res.status(200).json({
        asesorado: result
    });
  }
});


/** Operaciones Requeridas */


module.exports = {
  agregarAsesorado,
  obtenerAsesorados,
  eliminarAsesorado,
  actualizarAsesorado,
  obtenerAsesoradoPorId
};
