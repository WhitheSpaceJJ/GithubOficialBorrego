const { Router } = require('express')
const {
  obtenerDemandas,
  obtenerDemanda,
  crearDemanda,
  actualizarDemanda,
  eliminarDemanda
} = require('../controllers/demanda')
const {
  existeDemanda,
  existeProcesoJudicial
} = require('../middlewares/demanda')

const router = Router()

router.get('/', obtenerDemandas)

router.get('/:id', [
  existeDemanda
], obtenerDemanda)

router.post('/', [
  existeProcesoJudicial
], crearDemanda)

router.put('/:id', [
  existeDemanda
], actualizarDemanda)

router.delete('/:id', [
  existeDemanda
], eliminarDemanda)

module.exports = router
