const   express = require('express');
const   servicesColonias = require('../servicios/colonias.services');

const router = express.Router();

router.get ('/', servicesColonias.getColonias);
router.get ('/:id', servicesColonias.getColonia);

module.exports = router;