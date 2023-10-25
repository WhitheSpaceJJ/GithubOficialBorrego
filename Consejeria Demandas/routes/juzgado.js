const { Router } = require('express')

const {
  obtenerJuzgados,
  obtenerJuzgado,
  crearJuzgado,
  actualizarJuzgado,
  eliminarJuzgado
} = require('../controllers/juzgado')
const{
  existeJuzgado
} = require('../middlewares/juzgado')

const router = Router()

router.get('/', obtenerJuzgados)

router.get('/:id', [existeJuzgado], obtenerJuzgado)

router.post('/', crearJuzgado)

router.put('/:id', [existeJuzgado], actualizarJuzgado)

router.delete('/:id', [existeJuzgado], eliminarJuzgado)

module.exports = router
