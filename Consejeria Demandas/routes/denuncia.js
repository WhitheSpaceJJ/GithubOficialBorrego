const { Router } = require('express')
const {
  obtenerDenuncias,
  obtenerDenuncia,
  crearDenuncia,
  actualizarDenuncia,
  eliminarDenuncia
} = require('../controllers/denuncia')

const router = Router()

router.get('/', obtenerDenuncias)

router.get('/:id', obtenerDenuncia)

router.post('/', crearDenuncia)

router.put('/:id', actualizarDenuncia)

router.delete('/:id', eliminarDenuncia)

module.exports = router
