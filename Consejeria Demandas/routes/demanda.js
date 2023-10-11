const { Router } = require('express')
const {
  obtenerDemandas,
  obtenerDemanda,
  crearDemanda,
  actualizarDemanda,
  eliminarDemanda
} = require('../controllers/demanda')

const router = Router()

router.get('/', obtenerDemandas)

router.get('/:id', obtenerDemanda)

router.post('/', crearDemanda)

router.put('/:id', actualizarDemanda)

router.delete('/:id', eliminarDemanda)

module.exports = router
