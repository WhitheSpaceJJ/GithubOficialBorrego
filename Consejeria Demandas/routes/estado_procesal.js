const { Router } = require('express')
const {
  obtenerEstadosProcesales,
  obtenerEstadoProcesal,
  crearEstadoProcesal,
  actualizarEstadoProcesal,
  eliminarEstadoProcesal
} = require('../controllers/estado_procesal')
const{
  existeEstadoProcesal,
  existeProcesoJudicial
} = require('../middlewares/estado_procesal')

const router = Router()

router.get('/', obtenerEstadosProcesales)
router.get('/:id', [existeEstadoProcesal], obtenerEstadoProcesal)
router.post('/', [existeProcesoJudicial], crearEstadoProcesal)
router.put('/:id', [existeEstadoProcesal], actualizarEstadoProcesal)
router.delete('/:id', [existeEstadoProcesal], eliminarEstadoProcesal)

module.exports = router
