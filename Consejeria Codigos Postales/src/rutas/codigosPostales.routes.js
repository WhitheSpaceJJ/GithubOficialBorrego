const express = require('express');
const serviceCodigosPostales = require('../servicios/codigosPostales.services');

const router = express.Router();



//router.get('/', serviceCodigosPostales.getCodigosPostales);
//router.get('/:id', serviceCodigosPostales.getCodigoPostal);
router.get('/cp/:cp', serviceCodigosPostales.getColoniasByCodigoPostal);

module.exports = router;