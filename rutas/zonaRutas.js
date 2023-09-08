const express = require('express');
const servicioZonas = require('../servicios/servicioZonas');

const router = express.Router();


router.route('/')
  .get(servicioZonas.obtenerZonas)
  .post(servicioZonas.agregarZona);

router.route('/:id')
  .get(servicioZonas.obtenerZonaPorId)
  .delete(servicioZonas.eliminarZona)
  .put(servicioZonas.actualizarZona);

module.exports = router;