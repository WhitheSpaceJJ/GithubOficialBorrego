// Importamos los módulos necesarios
const express = require('express');
const servicioCatalogoRequisitos = require('../servicios/servicioCatalogoRequisitos');

// Creamos un nuevo router
const router = express.Router();

/** Operaciones Básicas */

router.route('/')
  // Obtener todos los requisitos del catálogo
  .get(servicioCatalogoRequisitos.obtenerCatalogoRequisitos)
  // Agregar un nuevo requisito al catálogo
  .post(servicioCatalogoRequisitos.agregarCatalogoRequisito);

router.route('/:id')
  // Obtener un requisito del catálogo por su ID
  .get(servicioCatalogoRequisitos.obtenerCatalogoRequisitoPorId)
  // Eliminar un requisito del catálogo por su ID
  .delete(servicioCatalogoRequisitos.eliminarCatalogoRequisito)
  // Actualizar un requisito del catálogo por su ID
  .put(servicioCatalogoRequisitos.actualizarCatalogoRequisito);


// Exportamos el router
module.exports = router;
