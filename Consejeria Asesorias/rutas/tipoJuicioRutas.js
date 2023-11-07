// Importamos los módulos necesarios
const express = require('express');
const servicioTiposDeJuicio = require('../servicios/servicioTiposJuicios');

// Creamos un nuevo router
const router = express.Router();

router.route('/')
  // Obtener todos los tipos de juicio
  .get(servicioTiposDeJuicio.obtenerTiposDeJuicio)
  // Agregar un nuevo tipo de juicio
  .post(servicioTiposDeJuicio.agregarTipoDeJuicio);

router.route('/:id')
  // Obtener un tipo de juicio por su ID
  .get(servicioTiposDeJuicio.obtenerTipoDeJuicioPorId)
  // Eliminar un tipo de juicio por su ID
  .delete(servicioTiposDeJuicio.eliminarTipoDeJuicio)
  // Actualizar un tipo de juicio por su ID
  .put(servicioTiposDeJuicio.actualizarTipoDeJuicio);

// Exportamos el router
module.exports = router;
