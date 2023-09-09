const express = require('express');
const servicioPersonas = require('../servicios/servicioPersonas');

const router = express.Router();

/** Operaciones Basica */

router.route('/')
  .get(servicioPersonas.obtenerPersonas)
  .post(servicioPersonas.agregarPersona);

router.route('/:id')
  .get(servicioPersonas.obtenerPersonaPorId)
  .delete(servicioPersonas.eliminarPersona)
  .put(servicioPersonas.actualizarPersona);

/** Operaciones Requeridas */

module.exports = router;