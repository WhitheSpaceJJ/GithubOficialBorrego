const express = require('express');
const serviceEstados = require('../services/estados.services.js');

const router = express.Router();


router.get('/', serviceEstados.getEstados);
router.get('/:id', serviceEstados.getEstado);



module.exports = router;


