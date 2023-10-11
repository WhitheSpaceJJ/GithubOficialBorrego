const { Router } = require('express')
const {
  obtenerJueces,
  obtenerJuez,
  crearJuez,
  actualizarJuez,
  eliminarJuez
} = require('../controllers/juez')

const router = Router()

router.get('/', obtenerJueces)

router.get('/:id', obtenerJuez)

router.post('/', crearJuez)

router.put('/:id', actualizarJuez)

router.delete('/:id', eliminarJuez)

module.exports = router
