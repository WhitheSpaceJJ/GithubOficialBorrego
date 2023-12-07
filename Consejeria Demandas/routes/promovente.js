// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de los promoventes
const {
  crearPromovente,
  obtenerPromoventes,
  obtenerPromovente,
  actualizarPromovente,
  eliminarPromovente
} = require('../controllers/promovente')

// Importamos los middlewares de los promoventes
const {
  existePromovente,
  existeParticipante
} = require('../middlewares/promovente')

// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para crear un nuevo promovente
router.post('/', [existeParticipante], crearPromovente)

// Definimos la ruta para obtener todos los promoventes
router.get('/', obtenerPromoventes)

// Definimos la ruta para obtener un promovente por su id
router.get('/:id', [existePromovente], obtenerPromovente)

// Definimos la ruta para actualizar un promovente por su id
router.put('/:id', [existePromovente], actualizarPromovente)

// Definimos la ruta para eliminar un promovente por su id
router.delete('/:id', [existePromovente], eliminarPromovente)

// Exportamos el router
module.exports = router