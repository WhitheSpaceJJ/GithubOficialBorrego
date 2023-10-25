const { Router } = require('express');

const {
  crearProcesoJudicial,
  obtenerProcesosJudiciales,
  obtenerProcesoJudicial,
  actualizarProcesoJudicial,
  eliminarProcesoJudicial
} = require('../controllers/proceso_judicial');
const{
  existeJuzgado,
  existeProcesoJudicial
} = require('../middlewares/proceso_judicial')

const router = Router();

router.post('/', [existeJuzgado], crearProcesoJudicial);

router.get('/', obtenerProcesosJudiciales);

router.get('/:id', [existeProcesoJudicial], obtenerProcesoJudicial);

router.put('/:id', [existeProcesoJudicial], actualizarProcesoJudicial);

router.delete('/:id', [existeProcesoJudicial], eliminarProcesoJudicial);

module.exports = router;
