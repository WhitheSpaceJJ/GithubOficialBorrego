
// Importamos el módulo express y el servicio de usuarios
const express = require('express');
const servicioUsuarios = require('../servicios/servicioUsuarios');

// Creamos un nuevo router
const router = express.Router();

// Definimos la ruta '/usuario' que responde a una petición GET
// Esta ruta utiliza el método obtenerUsuarioCorreoPassword del servicio de usuarios
router.route('/usuario')
  .get(servicioUsuarios.obtenerUsuarioCorreoPassword);

// Definimos la ruta '/recuperacion' que responde a una petición GET
// Esta ruta utiliza el método recuperarContraseña del servicio de usuarios
router.route('/recuperacion')
  .get(servicioUsuarios.recuperarContraseña);

// Definimos la ruta '/' que responde a una petición GET y POST
// La petición GET utiliza el método obtenerUsuarioPorId del servicio de usuarios
// La petición POST utiliza el método agregarUsuario del servicio de usuarios
router.route('/')
  .get(servicioUsuarios.obtenerUsuarioPorId)
  .post(servicioUsuarios.agregarUsuario);

// Definimos la ruta '/:id' que responde a una petición GET, DELETE y PUT
// La petición GET utiliza el método obtenerUsuarioPorId del servicio de usuarios
// La petición DELETE utiliza el método eliminarUsuario del servicio de usuarios
// La petición PUT utiliza el método actualizarUsuario del servicio de usuarios
router.route('/:id')
  .get(servicioUsuarios.obtenerUsuarioPorId)
  .delete(servicioUsuarios.eliminarUsuario)
  .put(servicioUsuarios.actualizarUsuario);

// Exportamos el router
module.exports = router;