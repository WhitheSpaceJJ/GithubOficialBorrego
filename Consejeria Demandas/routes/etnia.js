const { Router } = require('express')
const {
    obtenerEtnias,
    obtenerEtnia,
    crearEtnia,
    actualizarEtnia,
    eliminarEtnia } = require('../controllers/etnia')

const router = Router()

router.get('/', obtenerEtnias)
router.get('/:id', obtenerEtnia)
router.post('/', crearEtnia)
router.put('/:id', actualizarEtnia)
router.delete('/:id', eliminarEtnia)

module.exports = router