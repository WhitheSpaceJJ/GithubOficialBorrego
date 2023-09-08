const controlPersonas = require('../controles/controlPersona');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");
/** Operaciones Basica */


const agregarPersona = asyncError(async (req, res, next) => {
  const result = await controlPersonas.agregarPersona(req.body);
  if (typeof result === false) {
    const error = new CustomeError('Error al agregar una persona', 400);
    return next(error);
  } else {
    const { nombre, apellido_paterno, apellido_materno, edad, telefono, id_domicilio, id_genero } = req.body;
    res.status(201).json({
      status: 'success',
      data: {
        persona: {
          nombre,
          apellido_paterno,
          apellido_materno,
          edad,
          telefono,
          id_domicilio,
          id_genero
        }
      }
    });
  }
});

const obtenerPersonas = asyncError(async (req, res, next) => {
  const result = await controlPersonas.obtenerPersonas();
  if (typeof result === null) {
    const error = new CustomeError('No se encontraron personas', 404);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        personas: result
      }
    });
  }
});

const eliminarPersona = asyncError(async (req, res, next) => {
  const result = await controlPersonas.eliminarPersona(req.params.id);
  if (typeof result === false) {
    const error = new CustomeError('Error al eliminar la persona', 400);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        persona: result
      }
    });
  }
});

const actualizarPersona = asyncError(async (req, res, next) => {
  const result = await controlPersonas.actualizarPersona(req.body);
  if (typeof result === false) {
    const error = new CustomeError('Error al actualizar la persona', 400);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        persona: req.body
      }
    });
  }
});

const obtenerPersonaPorId = asyncError(async (req, res, next) => {
  const result = await controlPersonas.obtenerPersonaPorId(req.params.id);
  if (typeof result === null) {
    const error = new CustomeError('Error al obtener la persona', 404);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        persona: result
      }
    });
  }
});

/** Operaciones Requeridas */

module.exports = {
  agregarPersona,
  obtenerPersonas,
  eliminarPersona,
  actualizarPersona,
  obtenerPersonaPorId
};
