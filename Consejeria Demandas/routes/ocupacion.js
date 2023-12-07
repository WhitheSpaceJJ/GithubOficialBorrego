// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de las ocupaciones
const {
  obtenerOcupaciones,
  crearOcupacion,
  obtenerOcupacion,
  actualizarOcupacion,
  eliminarOcupacion
} = require('../controllers/ocupacion')

// Importamos los middlewares de las ocupaciones
const {
  existeOcupacion,
  validateActualizarOcupacion,
  validateFormatoCrearJson
} = require('../middlewares/ocupacion')

// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para obtener todas las ocupaciones
router.get('/', obtenerOcupaciones)

// Definimos la ruta para obtener una ocupación por su id
router.get('/:id', [existeOcupacion], obtenerOcupacion)

// Definimos la ruta para crear una nueva ocupación
router.post('/', validateFormatoCrearJson, crearOcupacion)

// Definimos la ruta para actualizar una ocupación por su id
router.put('/:id', [existeOcupacion, validateActualizarOcupacion], actualizarOcupacion)

// Definimos la ruta para eliminar una ocupación por su id
router.delete('/:id', [existeOcupacion], eliminarOcupacion)

// Exportamos el router
module.exports = router