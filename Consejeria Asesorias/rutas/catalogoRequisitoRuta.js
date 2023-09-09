const express = require('express');
const servicioCatalogoRequisitos = require('../servicios/servicioCatalogoRequisitos');

const router = express.Router();

/** Operaciones Basica */


router.route('/')
  .get(servicioCatalogoRequisitos.obtenerCatalogoRequisitos)
  .post(servicioCatalogoRequisitos.agregarCatalogoRequisito);

router.route('/:id')
  .get(servicioCatalogoRequisitos.obtenerCatalogoRequisitoPorId)
  .delete(servicioCatalogoRequisitos.eliminarCatalogoRequisito)
  .put(servicioCatalogoRequisitos.actualizarCatalogoRequisito);

/** Operaciones Requeridas */

module.exports = router;