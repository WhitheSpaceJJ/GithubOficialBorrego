// Importamos los módulos necesarios
const express = require('express');
const servicioMunicipiosDistro = require('../servicios/servicioMunicipioDistro');

// Creamos un nuevo router
const router = express.Router();


router.route('/')
    // Obtener todos los municipios
    .get(servicioMunicipiosDistro.obtenerMunicipios)
    // Agregar un nuevo municipio
    .post(servicioMunicipiosDistro.agregarMunicipio);

router.route('/:id')
    // Obtener un municipio por su ID
    .get(servicioMunicipiosDistro.obtenerMunicipioPorId)
    // Eliminar un municipio por su ID
    .delete(servicioMunicipiosDistro.eliminarMunicipio)
    // Actualizar un municipio por su ID
    .put(servicioMunicipiosDistro.actualizarMunicipio); 


// Exportamos el router
module.exports = router;