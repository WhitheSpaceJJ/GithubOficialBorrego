const controlEstados = require('../controles/controlEstadoCivil');

const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/** Operaciones Basica */


const agregarEstadoCivil = asyncError(async (req, res, next) => {
  const result = await controlEstados.agregarEstadoCivil(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un estado civil', 400);
    return next(error);
  } else {
    /*
 res.status(201).json({
      status: 'success',
      data: {
        estadoCivil:result
      }
    });
    */
    res.status(201).json({
        estadoCivil:result
    });
  }
});


const obtenerEstadosCiviles = asyncError(async (req, res, next) => {
  const result = await controlEstados.obtenerEstadosCiviles();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron estados civiles', 404);
    return next(error);
  } else {
  /*
  res.status(200).json({
      status: 'success',
      data: {
        estadosCiviles: result
      }
    });
  */
    res.status(200).json({
        estadosCiviles: result
    });
  }
});

const eliminarEstadoCivil = asyncError(async (req, res, next) => {
  const result = await controlEstados.eliminarEstadoCivil(req.params.id);
  if ( result === false) {
    const error = new CustomeError('Error al eliminar el estado civil', 400);
    return next(error);
  } else {
    /*
res.status(200).json({
      status: 'success',
      data: {
        menssage: "El estado civil ha sido eliminado"
      }
    });
    */
    res.status(200).json({
        menssage: "El estado civil ha sido eliminado"
    });
  }
});

const actualizarEstadoCivil = asyncError(async (req, res, next) => {
  const result = await controlEstados.actualizarEstadoCivil(req.body);
  if ( result === false) {
    const error = new CustomeError('Error al actualizar el estado civil', 400);
    return next(error);
  } else {
   /*
 res.status(200).json({
      status: 'success',
      data: {
        estadoCivil: req.body
      }
    });
   */
    res.status(200).json({
        estadoCivil: req.body
    });
  }
});

const obtenerEstadoCivilPorId = asyncError(async (req, res, next) => {
  const result = await controlEstados.obtenerEstadoCivilPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el estado civil', 404);
    return next(error);
  } else {
    /*
  res.status(200).json({
      status: 'success',
      data: {
        estadoCivil: result
      }
    });
    */
    res.status(200).json({
        estadoCivil: result
    });
  }
});

/** Operaciones Requeridas */

module.exports = {
  agregarEstadoCivil,
  obtenerEstadosCiviles,
  eliminarEstadoCivil,
  actualizarEstadoCivil,
  obtenerEstadoCivilPorId
};