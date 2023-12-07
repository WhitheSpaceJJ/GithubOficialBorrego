// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de las denuncias
const {
  obtenerDenuncias,
  obtenerDenuncia,
  crearDenuncia,
  actualizarDenuncia,
  eliminarDenuncia
} = require('../controllers/denuncia')

// Importamos los middlewares de las denuncias
const {
  existeDenuncia,
  existeJuez,
  existeProcesoJudicial
} = require('../middlewares/denuncia')

// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para obtener todas las denuncias
router.get('/', obtenerDenuncias)

// Definimos la ruta para obtener una denuncia por su id
router.get('/:id', [existeDenuncia], obtenerDenuncia)

// Definimos la ruta para crear una nueva denuncia
router.post('/', [existeJuez, existeProcesoJudicial], crearDenuncia)

// Definimos la ruta para actualizar una denuncia por su id
router.put('/:id', [existeDenuncia], actualizarDenuncia)

// Definimos la ruta para eliminar una denuncia por su id
router.delete('/:id', [existeDenuncia], eliminarDenuncia)

// Exportamos el router
module.exports = router