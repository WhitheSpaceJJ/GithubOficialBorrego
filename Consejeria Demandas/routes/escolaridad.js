// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de las escolaridades
const {
  obtenerEscolaridades,
  obtenerEscolaridad,
  crearEscolaridad,
  actualizarEscolaridad,
  eliminarEscolaridad
} = require('../controllers/escolaridad')

// Importamos los middlewares de las escolaridades
const {
  existeEscolaridad
} = require('../middlewares/escolaridad')

// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para obtener todas las escolaridades
router.get('/', obtenerEscolaridades)

// Definimos la ruta para obtener una escolaridad por su id
router.get('/:id', [existeEscolaridad], obtenerEscolaridad)

// Definimos la ruta para crear una nueva escolaridad
router.post('/', crearEscolaridad)

// Definimos la ruta para actualizar una escolaridad por su id
router.put('/:id', [existeEscolaridad], actualizarEscolaridad)

// Definimos la ruta para eliminar una escolaridad por su id
router.delete('/:id', [existeEscolaridad], eliminarEscolaridad)

// Exportamos el router
module.exports = router