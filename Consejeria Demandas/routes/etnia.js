// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de las etnias
const {
    obtenerEtnias,
    obtenerEtnia,
    crearEtnia,
    actualizarEtnia,
    eliminarEtnia
} = require('../controllers/etnia')

// Importamos los middlewares de las etnias
const {
    existeEtnia
} = require('../middlewares/etnias')

// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para obtener todas las etnias
router.get('/', obtenerEtnias)

// Definimos la ruta para obtener una etnia por su id
router.get('/:id', [existeEtnia], obtenerEtnia)

// Definimos la ruta para crear una nueva etnia
router.post('/', crearEtnia)

// Definimos la ruta para actualizar una etnia por su id
router.put('/:id', [existeEtnia], actualizarEtnia)

// Definimos la ruta para eliminar una etnia por su id
router.delete('/:id', [existeEtnia], eliminarEtnia)

// Exportamos el router
module.exports = router