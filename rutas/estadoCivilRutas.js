const express = require('express');
const servicioEstados = require('../servicios/servicioEstadosCiviles');

const router = express.Router();
/** Operaciones Basica */


router.route('/')
  .get(servicioEstados.obtenerEstadosCiviles)
  .post(servicioEstados.agregarEstadoCivil);

router.route('/:id')
  .get(servicioEstados.obtenerEstadoCivilPorId)
  .delete(servicioEstados.eliminarEstadoCivil)
  .put(servicioEstados.actualizarEstadoCivil);

/** Operaciones Requeridas */

module.exports = router;
