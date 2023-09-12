const controlAsesorias = require('../controles/controlAsesoria');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");
const controlPersonas = require('../controles/controlPersonas');

/** Operaciones Basica */

const agregarAsesoria = asyncError(async (req, res, next) => {
  const result = await controlAsesorias.agregarAsesoria(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar una asesoría', 400);
    return next(error);
  } else {
    res.status(201).json({
      status: 'success',
      data: {
        asesoria: result
      }
    });
  }
});

const obtenerAsesorias = asyncError(async (req, res, next) => {
  const result = await controlAsesorias.obtenerAsesorias();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron asesorías', 404);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        asesorias: result
      }
    });
  }
});

const eliminarAsesoria = asyncError(async (req, res, next) => {
  const result = await controlAsesorias.eliminarAsesoria(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar la asesoría', 400);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        menssage: "La asesoria ha sido eliminada"
      }
    });
  }
});

const actualizarAsesoria = asyncError(async (req, res, next) => {
  const result = await controlAsesorias.actualizarAsesoria(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar la asesoría', 400);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        asesoria: req.body
      }
    });
  }
});

const obtenerAsesoriaPorId = asyncError(async (req, res, next) => {
  const result = await controlAsesorias.obtenerAsesoriaPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener la asesoría', 404);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        asesoria: result
      }
    });
  }


});


const obtenerAsesoriaNombre = asyncError(async (req, res, next) => {
  const { nombre, apellido_materno,apellido_paterno } = req.query;
  const result2 = await controlPersonas.obtenerPersonaNombre(nombre,apellido_paterno,apellido_materno);
  if (result2 === null) {
    const error = new CustomeError('Error al obtener la persona', 404);
    return next(error);
  } else {
   
    const result = await controlAsesorias.obtenerAsesoriaPorIdAsesorado(result2.id_persona);
    if (result === null || result === undefined) {
      const error = new CustomeError('Error al obtener la asesoría', 404);
      return next(error);
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          asesoria: result
        }
      });
    }
  
  }
});


/** Operaciones Requeridas */

module.exports = {
  agregarAsesoria,
  obtenerAsesorias,
  eliminarAsesoria,
  actualizarAsesoria,
  obtenerAsesoriaPorId,
  obtenerAsesoriaNombre
};
