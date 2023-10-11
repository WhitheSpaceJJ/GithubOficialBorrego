const { Router } = require('express');

const {
  crearPromovente,
  obtenerPromoventes,
  obtenerPromovente,
  actualizarPromovente,
  eliminarPromovente
} = require('../controllers/promovente');

const router = Router();

router.post('/', crearPromovente);

router.get('/', obtenerPromoventes);

router.get('/:id', obtenerPromovente);

router.put('/:id', actualizarPromovente);

router.delete('/:id', eliminarPromovente);

module.exports = router;
