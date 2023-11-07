// Importamos los módulos necesarios
const express = require('express');
const servicioGeneros = require('../servicios/servicioGenero');

// Creamos un nuevo router
const router = express.Router();


router.route('/')
  // Obtener todos los géneros
  .get(servicioGeneros.obtenerGeneros)
  // Agregar un nuevo género
  .post(servicioGeneros.agregarGenero);

router.route('/:id')
  // Obtener un género por su ID
  .get(servicioGeneros.obtenerGeneroPorId)
  // Eliminar un género por su ID
  .delete(servicioGeneros.eliminarGenero)
  // Actualizar un género por su ID
  .put(servicioGeneros.actualizarGenero);


// Exportamos el router
module.exports = router;