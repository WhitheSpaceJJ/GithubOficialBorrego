const { Router } = require('express')
const {
    obtenerImputados,
    obtenerImputado,
    crearImputado,
    actualizarImputado,
    eliminarImputado } = require('../controllers/imputado')

const router = Router()

router.get('/', obtenerImputados)
router.get('/:id', obtenerImputado)
router.post('/', crearImputado)
router.put('/:id', actualizarImputado)
router.delete('/:id', eliminarImputado)

module.exports = router