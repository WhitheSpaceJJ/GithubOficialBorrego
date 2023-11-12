// Importamos los módulos necesarios
const express = require('express');
const servicioDistritosJudiciales = require('../servicios/servicioDistritoJudicial');

// Creamos un nuevo router
const router = express.Router();


router.route('/')
    // Obtener todos los distritos judiciales
    .get(servicioDistritosJudiciales.obtenerDistritosJudiciales)
    // Agregar un nuevo distrito judicial
    .post(servicioDistritosJudiciales.agregarDistritoJudicial);

router.route('/:id')
    // Obtener un distrito judicial por su ID
    .get(servicioDistritosJudiciales.obtenerDistritoJudicialPorId)
    // Eliminar un distrito judicial por su ID
    .delete(servicioDistritosJudiciales.eliminarDistritoJudicial)
    // Actualizar un distrito judicial por su ID
    .put(servicioDistritosJudiciales.actualizarDistritoJudicial);


// Exportamos el router
module.exports = router;