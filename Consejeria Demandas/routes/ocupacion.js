const { Router } = require('express')

const {
  obtenerOcupaciones,
  crearOcupacion,
  obtenerOcupacion,
  actualizarOcupacion,
  eliminarOcupacion
} = require('../controllers/ocupacion')
const{
  existeOcupacion
} = require('../middlewares/ocupacion')

const router = Router()

router.get('/', obtenerOcupaciones)

router.get('/:id', [existeOcupacion], obtenerOcupacion)

router.post('/', crearOcupacion)

router.put('/:id', [existeOcupacion], actualizarOcupacion)

router.delete('/:id', [existeOcupacion], eliminarOcupacion)

module.exports = router
