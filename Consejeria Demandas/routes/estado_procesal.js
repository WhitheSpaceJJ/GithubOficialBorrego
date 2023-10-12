const { Router } = require('express')
const {
  obtenerEstadosProcesales,
  obtenerEstadoProcesal,
  crearEstadoProcesal,
  actualizarEstadoProcesal,
  eliminarEstadoProcesal
} = require('../controllers/estado_procesal')

const router = Router()

router.get('/', obtenerEstadosProcesales)
router.get('/:id', obtenerEstadoProcesal)
router.post('/', crearEstadoProcesal)
router.put('/:id', actualizarEstadoProcesal)
router.delete('/:id', eliminarEstadoProcesal)

module.exports = router
