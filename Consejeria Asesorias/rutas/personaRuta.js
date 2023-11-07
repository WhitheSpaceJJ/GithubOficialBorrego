// Importamos los módulos necesarios
const express = require('express');
const servicioPersonas = require('../servicios/servicioPersonas');

// Creamos un nuevo router
const router = express.Router();

router.route('/buscar')
  // Obtener una persona por su nombre
  .get(servicioPersonas.obtenerPersonaNombre);

router.route('/')
  // Obtener todas las personas
  .get(servicioPersonas.obtenerPersonas)
  // Agregar una nueva persona
  .post(servicioPersonas.agregarPersona);

router.route('/:id')
  // Obtener una persona por su ID
  .get(servicioPersonas.obtenerPersonaPorId)
  // Eliminar una persona por su ID
  .delete(servicioPersonas.eliminarPersona)
  // Actualizar una persona por su ID
  .put(servicioPersonas.actualizarPersona);

// Exportamos el router
module.exports = router;