const controlAsesorados = require('../controles/controlAsesorado');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/** Operaciones Basica */


const agregarAsesorado = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.agregarAsesorado(req.body);
  if (typeof result === false) {
    const error = new CustomeError('Error al agregar un asesorado', 400);
    return next(error);
  } else {
    const { id_asesorado, estatus_trabajo, id_motivo, id_estado_civil, numero_hijos, ingreso_mensual } = req.body;
    res.status(201).json({
      status: 'success',
      data: {
        asesorado: {
          id_asesorado,
          estatus_trabajo,
          id_motivo,
          id_estado_civil,
          numero_hijos,
          ingreso_mensual
        }
      }
    });
  }
});

const obtenerAsesorados = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.obtenerAsesorados();
  if (typeof result === null) {
    const error = new CustomeError('No se encontraron asesorados', 404);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        asesorados: result
      }
    });
  }
});

const eliminarAsesorado = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.eliminarAsesorado(req.params.id);
  if (typeof result === false) {
    const error = new CustomeError('Error al eliminar el asesorado', 400);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        asesorado: result
      }
    });
  }
});

const actualizarAsesorado = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.actualizarAsesorado(req.body);
  if (typeof result === false) {
    const error = new CustomeError('Error al actualizar el asesorado', 400);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        asesorado: req.body
      }
    });
  }
});

const obtenerAsesoradoPorId = asyncError(async (req, res, next) => {
  const result = await controlAsesorados.obtenerAsesoradoPorId(req.params.id);
  if (typeof result === null) {
    const error = new CustomeError('Error al obtener el asesorado', 404);
    return next(error);
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        asesorado: result
      }
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
