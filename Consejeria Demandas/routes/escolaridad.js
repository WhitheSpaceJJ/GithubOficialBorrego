const { Router } = require('express')
const {
  obtenerEscolaridades,
  obtenerEscolaridad,
  crearEscolaridad,
  actualizarEscolaridad,
  eliminarEscolaridad
} = require('../controllers/escolaridad')
const {
  existeEscolaridad
} = require('../middlewares/escolaridad')

const router = Router()

router.get('/', obtenerEscolaridades)

router.get('/:id', [existeEscolaridad], obtenerEscolaridad)

router.post('/', crearEscolaridad)

router.put('/:id', [existeEscolaridad], actualizarEscolaridad)

router.delete('/:id', [existeEscolaridad], eliminarEscolaridad)

module.exports = router
