const express = require('express');
const servicesCiudades = require('../servicios/ciudades.services');

const router = express.Router();


router.get ('/', servicesCiudades.getCiudades);
router.get ('/:id', servicesCiudades.getCiudad);

module.exports = router;