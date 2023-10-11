const { Router } = require('express')
const {
  obtenerEscolaridades,
  obtenerEscolaridad,
  crearEscolaridad,
  actualizarEscolaridad,
  eliminarEscolaridad
} = require('../controllers/escolaridad')

const router = Router()

router.get('/', obtenerEscolaridades)

router.get('/:id', obtenerEscolaridad)

router.post('/', crearEscolaridad)

router.put('/:id', actualizarEscolaridad)

router.delete('/:id', eliminarEscolaridad)

module.exports = router
