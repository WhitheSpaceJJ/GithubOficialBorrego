const express = require('express');
const servicioEstados = require('../servicios/servicioEstadosCiviles');

const router = express.Router();

// Rutas para Estados Civiles
router.route('/')
  .get(servicioEstados.obtenerEstadosCiviles)
  .post(servicioEstados.agregarEstadoCivil);

router.route('/:id')
  .get(servicioEstados.obtenerEstadoCivilPorId)
  .delete(servicioEstados.eliminarEstadoCivil)
  .put(servicioEstados.actualizarEstadoCivil);


module.exports = router;
