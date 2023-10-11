const { Router } = require('express')

const {
  obtenerJuzgados,
  obtenerJuzgado,
  crearJuzgado,
  actualizarJuzgado,
  eliminarJuzgado
} = require('../controllers/juzgado')

const router = Router()

router.get('/', obtenerJuzgados)

router.get('/:id', obtenerJuzgado)

router.post('/', crearJuzgado)

router.put('/:id', actualizarJuzgado)

router.delete('/:id', eliminarJuzgado)

module.exports = router
