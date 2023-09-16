const controlPersonas = require('../controles/controlPersonas');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");
/** Operaciones Basica */


const agregarPersona = asyncError(async (req, res, next) => {
  const result = await controlPersonas.agregarPersona(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar una persona', 400);
    return next(error);
  } else {
    /*
        res.status(201).json({
      status: 'success',
      data: {
        persona: result
      }
    });
    */
    res.status(201).json({
        persona: result
    });
  }
});

const obtenerPersonas = asyncError(async (req, res, next) => {
  const result = await controlPersonas.obtenerPersonas();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron personas', 404);
    return next(error);
  } else {
   /*
 res.status(200).json({
      status: 'success',
      data: {
        personas: result
      }
    });
   */
    res.status(200).json({
        personas: result
    });
  }
});

const obtenerPersonaNombre = asyncError(async (req, res, next) => {
  const { nombre, apellido_materno,apellido_paterno } = req.query;
  const result = await controlPersonas.obtenerPersonaNombre(nombre,apellido_paterno,apellido_materno);
  if (result === null) {
    const error = new CustomeError('Error al obtener la persona', 404);
    return next(error);
  } else {
  /*
  res.status(200).json({
      status: 'success',
      data: {
        persona: result
      }
    });
  */
    res.status(200).json({
        persona: result
    });
  }
});

const eliminarPersona = asyncError(async (req, res, next) => {
  const result = await controlPersonas.eliminarPersona(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar la persona', 400);
    return next(error);
  } else {
   /*
 res.status(200).json({
      status: 'success',
      data: {
        menssage: "La persona ha sido eliminada"
      }
    });
   */
    res.status(200).json({
        menssage: "La persona ha sido eliminada"
    });
  }
});

const actualizarPersona = asyncError(async (req, res, next) => {
  const result = await controlPersonas.actualizarPersona(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar la persona', 400);
    return next(error);
  } else {
  /*
  res.status(200).json({
      status: 'success',
      data: {
        persona: req.body
      }
    });
  */
    res.status(200).json({
        persona: req.body
    });
  }
});

const obtenerPersonaPorId = asyncError(async (req, res, next) => {
  const result = await controlPersonas.obtenerPersonaPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener la persona', 404);
    return next(error);
  } else {
  /*
  res.status(200).json({
      status: 'success',
      data: {
        persona: result
      }
    });
  */
    res.status(200).json({
        persona: result
    });
  }
});

/** Operaciones Requeridas */

module.exports = {
  agregarPersona,
  obtenerPersonas,
  eliminarPersona,
  actualizarPersona,
  obtenerPersonaPorId,
  obtenerPersonaNombre
};
