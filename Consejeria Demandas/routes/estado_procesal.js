// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de los estados procesales
const {
  obtenerEstadosProcesales,
  obtenerEstadoProcesal,
  crearEstadoProcesal,
  actualizarEstadoProcesal,
  eliminarEstadoProcesal
} = require('../controllers/estado_procesal')

// Importamos los middlewares de los estados procesales
const {
  existeEstadoProcesal,
  existeProcesoJudicial
} = require('../middlewares/estado_procesal')

// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para obtener todos los estados procesales
router.get('/', obtenerEstadosProcesales)

// Definimos la ruta para obtener un estado procesal por su id
router.get('/:id', [existeEstadoProcesal], obtenerEstadoProcesal)

// Definimos la ruta para crear un nuevo estado procesal
router.post('/', [existeProcesoJudicial], crearEstadoProcesal)

// Definimos la ruta para actualizar un estado procesal por su id
router.put('/:id', [existeEstadoProcesal], actualizarEstadoProcesal)

// Definimos la ruta para eliminar un estado procesal por su id
router.delete('/:id', [existeEstadoProcesal], eliminarEstadoProcesal)

// Exportamos el router
module.exports = router