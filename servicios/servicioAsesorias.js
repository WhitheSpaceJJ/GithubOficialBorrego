const controlAsesorias = require('../controles/controlAsesoria');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

const agregarAsesoria = asyncError(async (req, res, next) => {
  const result = await controlAsesorias.agregarAsesoria(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar una asesoría', 400);
    return next(error);
  } else {
    const { resumen_asesoria, conclusion_asesoria, estatus_requisitos, fecha_registro, id_asesor, id_turno, id_asesorado, usuario } = req.body;
    res.status(201).json({
      status: 'success',
      data: {
        asesoria: {
          id_asesoria: result,
          resumen_asesoria,
          conclusion_asesoria,
          estatus_requisitos,
          fecha_registro,
          id_asesor,
          id_turno,
          id_asesorado,
          usuario
        }
      }
    });
  }
});

const obtenerAsesorias = asyncError(async (req, res, next) => {
  const result = await controlAsesorias.obtenerAsesorias();
  if (result === null) {
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
        asesoria: result
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
  if (result === null) {
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

module.exports = {
  agregarAsesoria,
  obtenerAsesorias,
  eliminarAsesoria,
  actualizarAsesoria,
  obtenerAsesoriaPorId
};
