const { Router } = require('express')
const {
    obtenerEtnias,
    obtenerEtnia,
    crearEtnia,
    actualizarEtnia,
    eliminarEtnia } = require('../controllers/etnia')

const{
    existeEtnia
} = require('../middlewares/etnias')
const router = Router()

router.get('/', obtenerEtnias)
router.get('/:id', [existeEtnia], obtenerEtnia)
router.post('/', crearEtnia)
router.put('/:id', [existeEtnia], actualizarEtnia)
router.delete('/:id', [existeEtnia], eliminarEtnia)

module.exports = router