const express = require('express');

const servicioTiposDeJuicio = require('../servicios/servicioTiposJuicios');

const router = express.Router();

/** Operaciones Basica */


router.route('/')
  .get(servicioTiposDeJuicio.obtenerTiposDeJuicio)
  .post(servicioTiposDeJuicio.agregarTipoDeJuicio)
  ;

router.route('/:id')
  .get(servicioTiposDeJuicio.obtenerTipoDeJuicioPorId)
  .delete(servicioTiposDeJuicio.eliminarTipoDeJuicio)
  .put(servicioTiposDeJuicio.actualizarTipoDeJuicio)
  ;

/** Operaciones Requeridas */


module.exports = router;
