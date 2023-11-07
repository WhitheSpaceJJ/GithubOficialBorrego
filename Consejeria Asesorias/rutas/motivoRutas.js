// Importamos los módulos necesarios
const express = require('express');
const servicioMotivos = require('../servicios/servicioMotivos');

// Creamos un nuevo router
const router = express.Router();

router.route('/')
  // Obtener todos los motivos
  .get(servicioMotivos.obtenerMotivos)
  // Agregar un nuevo motivo
  .post(servicioMotivos.agregarMotivo);

router.route('/:id')
  // Obtener un motivo por su ID
  .get(servicioMotivos.obtenerMotivoPorId)
  // Eliminar un motivo por su ID
  .delete(servicioMotivos.eliminarMotivo)
  // Actualizar un motivo por su ID
  .put(servicioMotivos.actualizarMotivo);

// Exportamos el router
module.exports = router;