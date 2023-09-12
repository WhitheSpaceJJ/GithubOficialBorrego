const express = require('express');
const servicioMotivos = require('../servicios/servicioMotivos');

const router = express.Router();

/** Operaciones Basica */


router.route('/')
  .get(servicioMotivos.obtenerMotivos)
  .post(servicioMotivos.agregarMotivo)
  ;

router.route('/:id')
  .get(servicioMotivos.obtenerMotivoPorId)
  .delete(servicioMotivos.eliminarMotivo)
  .put(servicioMotivos.actualizarMotivo)
  ;

/** Operaciones Requeridas */

module.exports = router;
