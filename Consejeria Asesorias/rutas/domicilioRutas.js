const express = require('express');
const servicioDomicilios = require('../servicios/servicioDomicilios');

const router = express.Router();

/** Operaciones Basica */

router.route('/')
  .get(servicioDomicilios.obtenerDomicilios)
  .post(servicioDomicilios.agregarDomicilio)
  ;

router.route('/:id')
  .get(servicioDomicilios.obtenerDomicilioPorId)
  .delete(servicioDomicilios.eliminarDomicilio)
  .put(servicioDomicilios.actualizarDomicilio)
  ;

/** Operaciones Requeridas */

module.exports = router;