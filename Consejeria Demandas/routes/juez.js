const { Router } = require('express')
const {
  obtenerJueces,
  obtenerJuez,
  crearJuez,
  actualizarJuez,
  eliminarJuez
} = require('../controllers/juez')
const{
  existeJuez,
  validateActualizarJuez,
  validateFormatoCrearJson
} = require('../middlewares/juez')

const router = Router()

router.get('/', obtenerJueces)

router.get('/:id', existeJuez, obtenerJuez)

router.post('/', validateFormatoCrearJson, crearJuez)

router.put('/:id', [existeJuez, validateActualizarJuez], actualizarJuez)

router.delete('/:id', existeJuez, eliminarJuez)

module.exports = router
