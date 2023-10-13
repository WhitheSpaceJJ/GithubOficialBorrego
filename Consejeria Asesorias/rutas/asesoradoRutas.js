const express = require('express');
const servicioAsesorados = require('../servicios/servicioAsesorados');

const router = express.Router();

/** Operaciones Basica */

router.route('/')
  .get(servicioAsesorados.obtenerAsesorados)
  .post(servicioAsesorados.agregarAsesorado)
  ;

router.route('/:id')
  .get(servicioAsesorados.obtenerAsesoradoPorId)
  .delete(servicioAsesorados.eliminarAsesorado)
  .put(servicioAsesorados.actualizarAsesorado)
  ;

  /** Operaciones Requeridas */

module.exports = router;