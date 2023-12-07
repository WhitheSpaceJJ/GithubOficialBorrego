const juzgadoDAO = require('../data-access/juzgadoDAO')
const procesoJudicialDAO = require('../data-access/proceso_judicialDAO')

/**
 * @abstract Middleware que verifica si existe un proceso judicial con el id proporcionado
 * @param {number} id_proceso_judicial - ID del proceso judicial a verificar
 * @returns {object} Retorna un mensaje de error si el proceso judicial no existe, de lo contrario pasa al siguiente middleware
 */
async function existeProcesoJudicial(req, res, next) {
  const { id_proceso_judicial } = req.body
  const procesoJudicial = await procesoJudicialDAO.obtenerProcesoJudicial(id_proceso_judicial)
  if (!procesoJudicial) {
    return res.status(404).json({
      message: 'No existe un proceso judicial con ese id'
    })
  }
  next()
}

/**
 * @abstract Middleware que verifica si existe un juzgado con el id proporcionado
 * @param {number} id_juzgado - ID del juzgado a verificar
 * @returns {object} Retorna un mensaje de error si el juzgado no existe, de lo contrario pasa al siguiente middleware
 */
async function existeJuzgado(req, res, next) {
  const { id_juzgado } = req.body
  console.log(id_juzgado)
  const juzgado = await juzgadoDAO.obtenerJuzgado(id_juzgado)
  if (!juzgado) {
    return res.status(404).json({
      message: 'No existe un juzgado con ese id'
    })
  }
  next()
}

module.exports = {
  existeProcesoJudicial,
  existeJuzgado
}
