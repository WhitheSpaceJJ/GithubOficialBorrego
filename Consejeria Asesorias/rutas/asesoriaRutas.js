const express = require('express');
const servicioAsesorias = require('../servicios/servicioAsesorias');

const router = express.Router();

router.route('/buscar')
  .get(servicioAsesorias.obtenerAsesoriaNombre);

/** Operaciones Basica */

router.route('/')
  .get(servicioAsesorias.obtenerAsesorias)
  .post(servicioAsesorias.agregarAsesoria);

router.route('/:id')
  .get(servicioAsesorias.obtenerAsesoriaPorId)
  .delete(servicioAsesorias.eliminarAsesoria)
  .put(servicioAsesorias.actualizarAsesoria)
  ;
/*
  router.route('/buscar')
  .get(servicioPersonas.obtenerPersonaNombre);
  */

/** Operaciones Requeridas */

module.exports = router;