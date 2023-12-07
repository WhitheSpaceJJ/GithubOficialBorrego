// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de los procesos judiciales
const {
  crearProcesoJudicial,
  obtenerProcesosJudiciales,
  obtenerProcesoJudicial,
  actualizarProcesoJudicial,
  eliminarProcesoJudicial
} = require('../controllers/proceso_judicial')

// Importamos los middlewares de los procesos judiciales
const {
  existeJuzgado,
  existeProcesoJudicial
} = require('../middlewares/proceso_judicial')

// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para crear un nuevo proceso judicial
router.post('/', [existeJuzgado], crearProcesoJudicial)

// Definimos la ruta para obtener todos los procesos judiciales
router.get('/', obtenerProcesosJudiciales)

// Definimos la ruta para obtener un proceso judicial por su id
router.get('/:id', [existeProcesoJudicial], obtenerProcesoJudicial)

// Definimos la ruta para actualizar un proceso judicial por su id
router.put('/:id', [existeProcesoJudicial], actualizarProcesoJudicial)

// Definimos la ruta para eliminar un proceso judicial por su id
router.delete('/:id', [existeProcesoJudicial], eliminarProcesoJudicial)

// Exportamos el router
module.exports = router