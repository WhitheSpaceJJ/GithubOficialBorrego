const controlDetalleAsesoriaCatalogo = require('../controles/controlDetalleAsesoria');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/** Operaciones Básicas */

const agregarDetalleAsesoriaCatalogo = asyncError(async (req, res, next) => {
  const result = await controlDetalleAsesoriaCatalogo.agregarDetalleAsesoriaCatalogo(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un detalle de asesoría al catálogo', 400);
    return next(error);
  } else {
    /*
 res.status(201).json({
      status: 'success',
      data: {
        detalle: result
      }
    });
    */
    res.status(201).json({
        detalle: result
    });
   
  }
});

const obtenerDetallesAsesoriaCatalogo = asyncError(async (req, res, next) => {
  const result = await controlDetalleAsesoriaCatalogo.obtenerDetallesAsesoriaCatalogo();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron detalles de asesoría en el catálogo', 404);
    return next(error);
  } else {
  /*
  res.status(200).json({
      status: 'success',
      data: {
        detalles: result
      }
    });
  */
    res.status(200).json({
        detalles: result
    });
  }
});

const eliminarDetalleAsesoriaCatalogo = asyncError(async (req, res, next) => {
  const result = await controlDetalleAsesoriaCatalogo.eliminarDetalleAsesoriaCatalogo(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar el detalle de asesoría del catálogo', 400);
    return next(error);
  } else {
    /*
res.status(200).json({
      status: 'success',
      data: {
        message: "El detalle de asesoría ha sido eliminado"
      }
    });
    */
    res.status(200).json({
        message: "El detalle de asesoría ha sido eliminado"
    });
  }
});

const actualizarDetalleAsesoriaCatalogo = asyncError(async (req, res, next) => {
  const result = await controlDetalleAsesoriaCatalogo.actualizarDetalleAsesoriaCatalogo(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar el detalle de asesoría del catálogo', 400);
    return next(error);
  } else {
   /*
    res.status(200).json({
      status: 'success',
      data: {
        detalle: req.body
      }
    });
   */
    res.status(200).json({
        detalle: req.body
    });
  }
});

const obtenerDetalleAsesoriaCatalogoPorId = asyncError(async (req, res, next) => {
  const result = await controlDetalleAsesoriaCatalogo.obtenerDetalleAsesoriaCatalogoPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el detalle de asesoría del catálogo', 404);
    return next(error);
  } else {
 /*
   res.status(200).json({
      status: 'success',
      data: {
        detalle: result
      }
    });
 */
    res.status(200).json({
        detalle: result
    });
  }
});

/** Operaciones Requeridas */

module.exports = {
  agregarDetalleAsesoriaCatalogo,
  obtenerDetallesAsesoriaCatalogo,
  eliminarDetalleAsesoriaCatalogo,
  actualizarDetalleAsesoriaCatalogo,
  obtenerDetalleAsesoriaCatalogoPorId
};
