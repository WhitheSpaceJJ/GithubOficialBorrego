// Importamos los módulos necesarios
const express = require('express');
const servicioEstados = require('../servicios/servicioEstadosCiviles');

// Creamos un nuevo router
const router = express.Router();

router.route('/')
  // Obtener todos los estados civiles
  .get(servicioEstados.obtenerEstadosCiviles)
  // Agregar un nuevo estado civil
  .post(servicioEstados.agregarEstadoCivil);

router.route('/:id')
  // Obtener un estado civil por su ID
  .get(servicioEstados.obtenerEstadoCivilPorId)
  // Eliminar un estado civil por su ID
  .delete(servicioEstados.eliminarEstadoCivil)
  // Actualizar un estado civil por su ID
  .put(servicioEstados.actualizarEstadoCivil);

// Exportamos el router
module.exports = router;