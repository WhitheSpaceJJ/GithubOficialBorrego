const express = require('express');
const servicioTurnos = require('../servicios/servicioTurnos');

const router = express.Router();


router.route('/')
  .get(servicioTurnos.obtenerTurnos)
  .post(servicioTurnos.agregarTurno);

router.route('/:id')
  .get(servicioTurnos.obtenerTurnoPorId)
  .delete(servicioTurnos.eliminarTurno)
  .put(servicioTurnos.actualizarTurno);

module.exports = router;