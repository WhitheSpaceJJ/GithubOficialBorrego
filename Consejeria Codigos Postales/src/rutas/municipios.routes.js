const express = require('express');
const serviceMunicipios = require('../servicios/municipios.services.js');

const router = express.Router();


router.get('/', serviceMunicipios.getMunicipios );
router.get('/:id', serviceMunicipios.getMunicipio );



module.exports = router;