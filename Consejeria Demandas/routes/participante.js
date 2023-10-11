const { Router } = require('express');

const {
  crearParticipante,
  obtenerParticipantes,
  obtenerParticipante,
  actualizarParticipante,
  eliminarParticipante
} = require('../controllers/participante');

const router = Router();

router.post('/', crearParticipante);

router.get('/', obtenerParticipantes);

router.get('/:id', obtenerParticipante);

router.put('/:id', actualizarParticipante);

router.delete('/:id', eliminarParticipante);

module.exports = router;
