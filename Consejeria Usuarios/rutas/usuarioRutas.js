const express = require('express');
const servicioUsuarios = require('../servicios/servicioUsuarios');

const router = express.Router();
/** Operaciones Basica */

router.route('/usuario')
  .get(servicioUsuarios.obtenerUsuarioCorreoPassword);

  router.route('/recuperacion')
  .get(servicioUsuarios.recuperarContraseña);
/*

router.route('/')
  .get(servicioUsuarios.obtenerUsuarioPorId)
  .post(servicioUsuarios.agregarUsuario)
  ;

router.route('/:id')
  .get(servicioUsuarios.obtenerUsuarioPorId)
  .delete(servicioUsuarios.eliminarUsuario)
  .put(servicioUsuarios.actualizarUsuario)
  ;
*/
/** Operaciones Requeridas */

module.exports = router;