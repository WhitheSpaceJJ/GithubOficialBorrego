const express = require('express');
const servicioDetalleAsesoria = 
require('../servicios/servicioDetalleAsesoria');

const router = express.Router();
/** Operaciones Basica */



router.route('/')
  .get(servicioDetalleAsesoria.obtenerDetallesAsesoriaCatalogo)
  .post(servicioDetalleAsesoria.agregarDetalleAsesoriaCatalogo)
  ;

router.route('/:id')
  .get(servicioDetalleAsesoria.obtenerDetalleAsesoriaCatalogoPorId)
  .delete(servicioDetalleAsesoria.eliminarDetalleAsesoriaCatalogo)
  .put(servicioDetalleAsesoria.actualizarDetalleAsesoriaCatalogo)
  ;

/** Operaciones Requeridas */

module.exports = router;