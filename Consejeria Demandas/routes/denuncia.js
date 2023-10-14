const { Router } = require('express')
const {
  obtenerDenuncias,
  obtenerDenuncia,
  crearDenuncia,
  actualizarDenuncia,
  eliminarDenuncia
} = require('../controllers/denuncia')
const{
  existeDenuncia,
  existeJuez,
  existeProcesoJudicial
} = require('../middlewares/denuncia')

const router = Router()

router.get('/', obtenerDenuncias)

router.get('/:id', [existeDenuncia], obtenerDenuncia)

router.post('/', [existeJuez, existeProcesoJudicial] ,crearDenuncia)

router.put('/:id', [existeDenuncia], actualizarDenuncia)

router.delete('/:id', [existeDenuncia], eliminarDenuncia)

module.exports = router
