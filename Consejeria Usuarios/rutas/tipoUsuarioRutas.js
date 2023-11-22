// Importamos los módulos necesarios
const express = require('express');
const servicioTipos = require('../servicios/servicioTipoUsuario');

// Creamos un nuevo router
const router = express.Router();

// Definimos las rutas y los controladores para cada una
router.route('/').
    // Obtener todos los tipos de usuario
    get(servicioTipos.obtenerTiposUsuario).
    // Agregar un nuevo tipo de usuario
    post(servicioTipos.agregarTipoUsuario); 

router.route('/:id').
    // Obtener un tipo de usuario por su ID
    get(servicioTipos.obtenerTipoUsuarioPorId).
    // Eliminar un tipo de usuario por su ID
    delete(servicioTipos.eliminarTipoUsuario).
    // Actualizar un tipo de usuario por su ID
    put(servicioTipos.actualizarTipoUsuario);   

// Exportamos el router

module.exports = router;