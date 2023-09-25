const controlAsesores = require('../controles/controlAsesor');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/** Operaciones Basica */

const agregarAsesor = asyncError(async (req, res, next) => {
  const result = await controlAsesores.agregarAsesor(req.body);
  if ( result === false) {
    const error = new CustomeError('Error al agregar un asesor', 400);
    return next(error);
  } else {
    /*
    res.status(201).json({
      status: 'success',
      data: {
        asesor:result
      }
    });
    */
    res.status(201).json({
        asesor:result
    });
  }
});

const obtenerAsesores = asyncError(async (req, res, next) => {
  const result = await controlAsesores.obtenerAsesores();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron asesores', 404);
    return next(error);
  } else {
    /*
    res.status(200).json({
      status: 'success',
      data: {
        asesores: result
      }
    });
    */
    res.status(200).json({
     
        asesores: result
    });
  }
});

const eliminarAsesor = asyncError(async (req, res, next) => {
  const result = await controlAsesores.eliminarAsesor(req.params.id);
  if ( result === false) {
    const error = new CustomeError('Error al eliminar el asesor', 400);
    return next(error);
  } else {
    /*
    res.status(200).json({
      status: 'success',
      data: {
        menssage: "El asesor ha sido eliminado"
      }
    });
    */
    res.status(200).json({
        menssage: "El asesor ha sido eliminado"
    });
  }
});

const actualizarAsesor = asyncError(async (req, res, next) => {
  const result = await controlAsesores.actualizarAsesor(req.body);
  if ( result === false) {
    const error = new CustomeError('Error al actualizar el asesor', 400);
    return next(error);
  } else {
    /*
    res.status(200).json({
      status: 'success',
      data: {
        asesor: req.body
      }
    });
    */
    res.status(200).json({
        asesor: req.body
    });
  }
});

const obtenerAsesorPorId = asyncError(async (req, res, next) => {
  const result = await controlAsesores.obtenerAsesorPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el asesor', 404);
    return next(error);
  } else {
    /*
    res.status(200).json({
      status: 'success',
      data: {
        asesor: result
      }
    });
    */
    res.status(200).json({
        asesor: result
    });
  }
});

/** Operaciones Requeridas */

module.exports = {
  agregarAsesor,
  obtenerAsesores,
  eliminarAsesor,
  actualizarAsesor,
  obtenerAsesorPorId
};
