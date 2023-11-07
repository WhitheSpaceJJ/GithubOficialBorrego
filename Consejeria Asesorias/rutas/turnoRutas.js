// Importamos los módulos necesarios
const express = require('express');
const servicioTurnos = require('../servicios/servicioTurnos');

// Creamos un nuevo router
const router = express.Router();

router.route('/')
  // Obtener todos los turnos
  .get(servicioTurnos.obtenerTurnos)
  // Agregar un nuevo turno
  .post(servicioTurnos.agregarTurno);

router.route('/:id')
  // Obtener un turno por su ID
  .get(servicioTurnos.obtenerTurnoPorId)
  // Eliminar un turno por su ID
  .delete(servicioTurnos.eliminarTurno)
  // Actualizar un turno por su ID
  .put(servicioTurnos.actualizarTurno);

// Exportamos el router
module.exports = router;