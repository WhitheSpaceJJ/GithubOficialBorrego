// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de los jueces
const {
  obtenerJueces,
  obtenerJuez,
  crearJuez,
  actualizarJuez,
  eliminarJuez
} = require('../controllers/juez')

// Importamos los middlewares de los jueces
const {
  existeJuez,
  validateActualizarJuez,
  validateFormatoCrearJson,
  validateCamposJuez
} = require('../middlewares/juez')

// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para obtener todos los jueces
router.get('/', obtenerJueces)

// Definimos la ruta para obtener un juez por su id
router.get('/:id', existeJuez, obtenerJuez)

// Definimos la ruta para crear un nuevo juez
router.post('/', validateFormatoCrearJson, crearJuez)

// Definimos la ruta para actualizar un juez por su id
router.put('/:id', [validateCamposJuez, existeJuez, validateActualizarJuez], actualizarJuez)

// Definimos la ruta para eliminar un juez por su id
router.delete('/:id', existeJuez, eliminarJuez)

// Exportamos el router
module.exports = router