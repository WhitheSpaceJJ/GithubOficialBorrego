const { Router } = require('express')
const {
  obtenerJueces,
  obtenerJuez,
  crearJuez,
  actualizarJuez,
  eliminarJuez
} = require('../controllers/juez')
const{
  existeJuez
} = require('../middlewares/juez')

const router = Router()

router.get('/', obtenerJueces)

router.get('/:id', [existeJuez], obtenerJuez)

router.post('/', crearJuez)

router.put('/:id', [existeJuez], actualizarJuez)

router.delete('/:id', [existeJuez], eliminarJuez)

module.exports = router
