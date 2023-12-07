// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de los participantes
const {
  crearParticipante,
  obtenerParticipantes,
  obtenerParticipante,
  actualizarParticipante,
  eliminarParticipante
} = require('../controllers/participante')

// Importamos los middlewares de los participantes
const {
  existeEscolaridad,
  existeEtnia,
  existeOcupacion,
  existeParticipante
} = require('../middlewares/participante')

// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para crear un nuevo participante
router.post('/', [existeEscolaridad, existeEtnia, existeOcupacion], crearParticipante)

// Definimos la ruta para obtener todos los participantes
router.get('/', obtenerParticipantes)

// Definimos la ruta para obtener un participante por su id
router.get('/:id', [existeParticipante], obtenerParticipante)

// Definimos la ruta para actualizar un participante por su id
router.put('/:id', [existeParticipante], actualizarParticipante)

// Definimos la ruta para eliminar un participante por su id
router.delete('/:id', [existeParticipante], eliminarParticipante)

// Exportamos el router
module.exports = router