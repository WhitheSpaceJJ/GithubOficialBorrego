const express = require('express');
const servicioAsesor = require('../servicios/servicioAsesores');

const router = express.Router();
/** Operaciones Basica */


router.route('/')
  .get(servicioAsesor.obtenerAsesores)
  .post(servicioAsesor.agregarAsesor);

router.route('/:id')
  .get(servicioAsesor.obtenerAsesorPorId)
  .delete(servicioAsesor.eliminarAsesor)
  .put(servicioAsesor.actualizarAsesor)
  ;
/** Operaciones Requeridas */

module.exports = router;