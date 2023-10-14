const { Router } = require('express');

const {
  crearParticipante,
  obtenerParticipantes,
  obtenerParticipante,
  actualizarParticipante,
  eliminarParticipante
} = require('../controllers/participante');
const{
  existeEscolaridad,
  existeEtnia,
  existeOcupacion,
  existeParticipante
} = require('../middlewares/participante')

const router = Router();

router.post('/', [existeEscolaridad, existeEtnia, existeOcupacion], crearParticipante);

router.get('/', obtenerParticipantes);

router.get('/:id', [existeParticipante], obtenerParticipante);

router.put('/:id', [existeParticipante], actualizarParticipante);

router.delete('/:id', [existeParticipante], eliminarParticipante);

module.exports = router;
