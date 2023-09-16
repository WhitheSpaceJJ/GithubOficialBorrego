const controlCatalogoRequisitos = require('../controles/controlCatalogoRequisito');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");
/** Operaciones Basica */

const agregarCatalogoRequisito = asyncError(async (req, res, next) => {
  const result = await controlCatalogoRequisitos.agregarCatalogoRequisito(req.body);
  if ( result === false) {
    const error = new CustomeError('Error al agregar un requisito del catálogo', 400);
    return next(error);
  } else {
    /*
    res.status(201).json({
      status: 'success',
      data: {
        requisitoCatalogo:result
      }
    });
    */
    res.status(201).json({
        requisitoCatalogo:result
    });
  }
});

const obtenerCatalogoRequisitos = asyncError(async (req, res, next) => {
  const result = await controlCatalogoRequisitos.obtenerCatalogoRequisitos();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron requisitos del catálogo', 404);
    return next(error);
  } else {
 /*
    res.status(200).json({
      status: 'success',
      data: {
        requisitosCatalogo: result
      }
    });
 */
    res.status(200).json({
        requisitosCatalogo: result
    });
  }
});

const eliminarCatalogoRequisito = asyncError(async (req, res, next) => {
  const result = await controlCatalogoRequisitos.eliminarCatalogoRequisito(req.params.id);
  if ( result === false) {
    const error = new CustomeError('Error al eliminar el requisito del catálogo', 400);
    return next(error);
  } else {
    /*
    res.status(200).json({
      status: 'success',
      data: {
        requisitoCatalogo: result
      }
    });
    */
    res.status(200).json({
        requisitoCatalogo: result
    });
  }
});

const actualizarCatalogoRequisito = asyncError(async (req, res, next) => {
  const result = await controlCatalogoRequisitos.actualizarCatalogoRequisito(req.body);
  if ( result === false) {
    const error = new CustomeError('Error al actualizar el requisito del catálogo', 400);
    return next(error);
  } else {
    /*
    res.status(200).json({
      status: 'success',
      data: {
        requisitoCatalogo: req.body
      }
    });
    */
    res.status(200).json({
        requisitoCatalogo: req.body
    });
  }
});

const obtenerCatalogoRequisitoPorId = asyncError(async (req, res, next) => {
  const result = await controlCatalogoRequisitos.obtenerCatalogoRequisitoPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el requisito del catálogo', 404);
    return next(error);
  } else {
    /*
    res.status(200).json({
      status: 'success',
      data: {
        requisitoCatalogo: result
      }
    });
    */
    res.status(200).json({
        requisitoCatalogo: result
    });
  }
});

/** Operaciones Requeridas */

module.exports = {
  agregarCatalogoRequisito,
  obtenerCatalogoRequisitos,
  eliminarCatalogoRequisito,
  actualizarCatalogoRequisito,
  obtenerCatalogoRequisitoPorId
};