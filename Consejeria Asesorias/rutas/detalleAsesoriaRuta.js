
// Importamos los módulos necesarios
const express = require('express');
const servicioDetalleAsesoria = require('../servicios/servicioDetalleAsesoria');

// Creamos un nuevo router
const router = express.Router();

/** Operaciones Básicas */

router.route('/')
  // Obtener todos los detalles de asesoría del catálogo
  .get(servicioDetalleAsesoria.obtenerDetallesAsesoriaCatalogo)
  // Agregar un nuevo detalle de asesoría al catálogo
  .post(servicioDetalleAsesoria.agregarDetalleAsesoriaCatalogo);

router.route('/:id')
  // Obtener un detalle de asesoría del catálogo por su ID
  .get(servicioDetalleAsesoria.obtenerDetalleAsesoriaCatalogoPorId)
  // Eliminar un detalle de asesoría del catálogo por su ID
  .delete(servicioDetalleAsesoria.eliminarDetalleAsesoriaCatalogo)
  // Actualizar un detalle de asesoría del catálogo por su ID
  .put(servicioDetalleAsesoria.actualizarDetalleAsesoriaCatalogo);

/** Operaciones Requeridas */

// Exportamos el router
module.exports = router;