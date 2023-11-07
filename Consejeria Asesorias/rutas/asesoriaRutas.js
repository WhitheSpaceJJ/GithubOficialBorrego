
const express = require('express');
const servicioAsesorias = require('../servicios/servicioAsesorias');

const router = express.Router();

router.route('/buscar')
  .get(servicioAsesorias.obtenerAsesoriaNombre);

  router.route('/filtro')
  .get(servicioAsesorias.obtenerAsesoriaFiltro);

  router.route('/filtro-excel')
  .get(servicioAsesorias.obtenerAsesoriaFiltroExcel);


router.route('/')
  .get(servicioAsesorias.obtenerAsesorias)
  .post(servicioAsesorias.agregarAsesoria);

router.route('/:id')
  .get(servicioAsesorias.obtenerAsesoriaPorId)
  .delete(servicioAsesorias.eliminarAsesoria)
  .put(servicioAsesorias.actualizarAsesoria)
  ;

module.exports = router;
 
