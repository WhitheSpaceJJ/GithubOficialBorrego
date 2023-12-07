// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de los juzgados
const {
  obtenerJuzgados,
  obtenerJuzgado,
  crearJuzgado,
  actualizarJuzgado,
  eliminarJuzgado
} = require('../controllers/juzgado')

// Importamos los middlewares de los juzgados
const {
  existeJuzgado
} = require('../middlewares/juzgado')

// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para obtener todos los juzgados
router.get('/', obtenerJuzgados)

// Definimos la ruta para obtener un juzgado por su id
router.get('/:id', [existeJuzgado], obtenerJuzgado)

// Definimos la ruta para crear un nuevo juzgado
router.post('/', crearJuzgado)

// Definimos la ruta para actualizar un juzgado por su id
router.put('/:id', [existeJuzgado], actualizarJuzgado)

// Definimos la ruta para eliminar un juzgado por su id
router.delete('/:id', [existeJuzgado], eliminarJuzgado)

// Exportamos el router
module.exports = router