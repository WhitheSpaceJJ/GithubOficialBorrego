const express = require('express');
const servicesCiudades = require('../services/ciudades.services');

const router = express.Router();


router.get ('/', servicesCiudades.getCiudades);
router.get ('/:id', servicesCiudades.getCiudad);

module.exports = router;