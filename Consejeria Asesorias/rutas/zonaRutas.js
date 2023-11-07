// Importamos los módulos necesarios
const express = require('express');
const servicioZonas = require('../servicios/servicioZonas');

// Creamos un nuevo router
const router = express.Router();


router.route('/')
  // Obtener todas las zonas
  .get(servicioZonas.obtenerZonas)
  // Agregar una nueva zona
  .post(servicioZonas.agregarZona);

router.route('/:id')
  // Obtener una zona por su ID
  .get(servicioZonas.obtenerZonaPorId)
  // Eliminar una zona por su ID
  .delete(servicioZonas.eliminarZona)
  // Actualizar una zona por su ID
  .put(servicioZonas.actualizarZona);


// Exportamos el router
module.exports = router;