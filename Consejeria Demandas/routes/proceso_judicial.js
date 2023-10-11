const { Router } = require('express');

const {
  crearProcesoJudicial,
  obtenerProcesosJudiciales,
  obtenerProcesoJudicial,
  actualizarProcesoJudicial,
  eliminarProcesoJudicial
} = require('../controllers/proceso_judicial');

const router = Router();

router.post('/', crearProcesoJudicial);

router.get('/', obtenerProcesosJudiciales);

router.get('/:id', obtenerProcesoJudicial);

router.put('/:id', actualizarProcesoJudicial);

router.delete('/:id', eliminarProcesoJudicial);

module.exports = router;
