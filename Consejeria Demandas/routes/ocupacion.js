const { Router } = require('express')

const {
  obtenerOcupaciones,
  crearOcupacion,
  obtenerOcupacion,
  actualizarOcupacion,
  eliminarOcupacion
} = require('../controllers/ocupacion')

const router = Router()

router.get('/', obtenerOcupaciones)

router.get('/:id', obtenerOcupacion)

router.post('/', crearOcupacion)

router.put('/:id', actualizarOcupacion)

router.delete('/:id', eliminarOcupacion)

module.exports = router
