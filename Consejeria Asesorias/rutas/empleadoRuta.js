// Importamos los módulos necesarios
const express = require('express');
const servicioEmpleado = require('../servicios/servicioEmpleado');

// Creamos un nuevo router
const router = express.Router();


router.route('/')
    // Obtener todos los empleados
    .get(servicioEmpleado.obtenerEmpleados)
    // Agregar un nuevo empleado
    .post(servicioEmpleado.agregarEmpleado);

router.route('/:id')
    // Obtener un empleado por su ID
    .get(servicioEmpleado.obtenerEmpleado)
    // Eliminar un empleado por su ID
    .delete(servicioEmpleado.eliminarEmpleado)
    // Actualizar un empleado por su ID
    .put(servicioEmpleado.actualizarEmpleado);  


// Exportamos el router
module.exports = router;