const express = require('express');
const servicioGeneros = require('../servicios/servicioGenero');

const router = express.Router();

// Rutas para Generos
router.route('/')
  .get(servicioGeneros.obtenerGeneros)
  .post(servicioGeneros.agregarGenero);

router.route('/:id')
  .get(servicioGeneros.obtenerGeneroPorId)
  .delete(servicioGeneros.eliminarGenero)
  .put(servicioGeneros.actualizarGenero);


module.exports = router;
