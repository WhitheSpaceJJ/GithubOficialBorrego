// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de los imputados
const {
    obtenerImputados,
    obtenerImputado,
    crearImputado,
    actualizarImputado,
    eliminarImputado
} = require('../controllers/imputado')

// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para obtener todos los imputados
router.get('/', obtenerImputados)

// Definimos la ruta para obtener un imputado por su id
router.get('/:id', obtenerImputado)

// Definimos la ruta para crear un nuevo imputado
router.post('/', crearImputado)

// Definimos la ruta para actualizar un imputado por su id
router.put('/:id', actualizarImputado)

// Definimos la ruta para eliminar un imputado por su id
router.delete('/:id', eliminarImputado)

// Exportamos el router
module.exports = router