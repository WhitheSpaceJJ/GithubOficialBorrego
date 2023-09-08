const express = require('express');
const servicioMotivos = require('../servicios/servicioMotivos');

const router = express.Router();


router.route('/')
  .get(servicioMotivos.obtenerMotivos)
  .post(servicioMotivos.agregarMotivo);

router.route('/:id')
  .get(servicioMotivos.obtenerMotivoPorId)
  .delete(servicioMotivos.eliminarMotivo)
  .put(servicioMotivos.actualizarMotivo);

module.exports = router;
