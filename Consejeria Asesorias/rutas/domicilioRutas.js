// Importamos los módulos necesarios
const express = require('express');
const servicioDomicilios = require('../servicios/servicioDomicilios');

// Creamos un nuevo router
const router = express.Router();

router.route('/')
  // Obtener todos los domicilios
  .get(servicioDomicilios.obtenerDomicilios)
  // Agregar un nuevo domicilio
  .post(servicioDomicilios.agregarDomicilio);

router.route('/:id')
  // Obtener un domicilio por su ID
  .get(servicioDomicilios.obtenerDomicilioPorId)
  // Eliminar un domicilio por su ID
  .delete(servicioDomicilios.eliminarDomicilio)
  // Actualizar un domicilio por su ID
  .put(servicioDomicilios.actualizarDomicilio);

// Exportamos el router
module.exports = router;