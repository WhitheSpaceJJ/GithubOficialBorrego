const express = require('express');
const servicioGeneros = require('../servicios/servicioGenero');

const router = express.Router();

/** Operaciones Basica */

router.route('/')
  .get(servicioGeneros.obtenerGeneros)
  .post(servicioGeneros.agregarGenero);

router.route('/:id')
  .get(servicioGeneros.obtenerGeneroPorId)
  .delete(servicioGeneros.eliminarGenero)
  .put(servicioGeneros.actualizarGenero);

/** Operaciones Requeridas */

module.exports = router;
