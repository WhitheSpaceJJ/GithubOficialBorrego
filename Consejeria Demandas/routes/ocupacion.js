const { Router } = require('express')

const {
  obtenerOcupaciones,
  crearOcupacion,
  obtenerOcupacion,
  actualizarOcupacion,
  eliminarOcupacion
} = require('../controllers/ocupacion')
const{
  existeOcupacion,
  validateActualizarOcupacion,
  validateFormatoCrearJson
} = require('../middlewares/ocupacion')

const router = Router()

router.get('/', obtenerOcupaciones)

router.get('/:id', [existeOcupacion], obtenerOcupacion)

router.post('/', validateFormatoCrearJson, crearOcupacion)

router.put('/:id', [existeOcupacion, validateActualizarOcupacion], actualizarOcupacion)

router.delete('/:id', [existeOcupacion], eliminarOcupacion)

module.exports = router
