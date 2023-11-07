const { Router } = require('express');

const {
  crearPromovente,
  obtenerPromoventes,
  obtenerPromovente,
  actualizarPromovente,
  eliminarPromovente
} = require('../controllers/promovente');

const {
  existePromovente,
  existeParticipante
} = require('../middlewares/promovente');

const router = Router();

router.post('/', [existeParticipante], crearPromovente);

router.get('/', obtenerPromoventes);

router.get('/:id', [existePromovente], obtenerPromovente);

router.put('/:id', [existePromovente], actualizarPromovente);

router.delete('/:id', [existePromovente], eliminarPromovente);

module.exports = router;
