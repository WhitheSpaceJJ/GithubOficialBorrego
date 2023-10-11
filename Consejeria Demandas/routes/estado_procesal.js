const { Router } = require('express')
const {
    obtenerEstadoProcesales,
    obtenerEstadoProcesal,
    crearEstadoProcesal,
    actualizarEstadoProcesal,
    eliminarEstadoProcesal } = require('../controllers/estado_procesal')

const router = Router()

router.get('/', obtenerEstadoProcesales)
router.get('/:id', obtenerEstadoProcesal)
router.post('/', crearEstadoProcesal)
router.put('/:id', actualizarEstadoProcesal)
router.delete('/:id', eliminarEstadoProcesal)

module.exports = router