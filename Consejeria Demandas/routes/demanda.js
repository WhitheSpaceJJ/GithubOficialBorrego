// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de las demandas
const {
  obtenerDemandas,
  obtenerDemanda,
  crearDemanda,
  actualizarDemanda,
  eliminarDemanda
} = require('../controllers/demanda')

// Importamos los middlewares de las demandas
const {
  existeDemanda,
  existeProcesoJudicial
} = require('../middlewares/demanda')

// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para obtener todas las demandas
router.get('/', obtenerDemandas)

// Definimos la ruta para obtener una demanda por su id
router.get('/:id', [
  existeDemanda
], obtenerDemanda)

// Definimos la ruta para crear una nueva demanda
router.post('/', [
  existeProcesoJudicial
], crearDemanda)

// Definimos la ruta para actualizar una demanda por su id
router.put('/:id', [
  existeDemanda
], actualizarDemanda)

// Definimos la ruta para eliminar una demanda por su id
router.delete('/:id', [
  existeDemanda
], eliminarDemanda)

// Exportamos el router
module.exports = router