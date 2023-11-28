
// Importamos los módulos necesarios
const express = require('express');
const servicioAsesor = require('../servicios/servicioAsesores');

// Creamos un nuevo router
const router = express.Router();

/** Operaciones Básicas */

// Definimos las rutas y sus manejadores de solicitudes
router.route('/')
  // Obtener todos los asesores
  .get(servicioAsesor.obtenerAsesores)
  // Agregar un nuevo asesor
  .post(servicioAsesor.agregarAsesor);

  router.route('/zona/:id')
  .get(servicioAsesor.obtenerAsesoresZona);
router.route('/:id')
  // Obtener un asesor por su ID
  .get(servicioAsesor.obtenerAsesorPorId)
  // Eliminar un asesor por su ID
  .delete(servicioAsesor.eliminarAsesor)
  // Actualizar un asesor por su ID
  .put(servicioAsesor.actualizarAsesor);


// Exportamos el router
module.exports = router;


