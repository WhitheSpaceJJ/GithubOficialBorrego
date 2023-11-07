
// Importa los módulos necesarios
const express = require('express');
const servicioAsesorados = require('../servicios/servicioAsesorados');

// Crea un nuevo router
const router = express.Router();

// Define las rutas para la ruta raíz
router.route('/')
  // Petición GET para obtener todos los Asesorados
  .get(servicioAsesorados.obtenerAsesorados)
  // Petición POST para agregar un nuevo Asesorado
  .post(servicioAsesorados.agregarAsesorado);

// Define las rutas para un Asesorado específico por ID
router.route('/:id')
  // Petición GET para obtener un Asesorado específico por ID
  .get(servicioAsesorados.obtenerAsesoradoPorId)
  // Petición DELETE para eliminar un Asesorado específico por ID
  .delete(servicioAsesorados.eliminarAsesorado)
  // Petición PUT para actualizar un Asesorado específico por ID
  .put(servicioAsesorados.actualizarAsesorado);

// Exporta el router
module.exports = router;