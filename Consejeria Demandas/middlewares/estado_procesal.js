const estadoProcesalDAO = require('../data-access/estado_procesalDAO')
const procesoJudicialDAO = require('../data-access/proceso_judicialDAO')

/**
 * @abstract Middleware que verifica si existe un estado procesal con el id proporcionado
 * @param {number} id - ID del estado procesal a verificar
 * @returns {object} Retorna un mensaje de error si el estado procesal no existe, de lo contrario pasa al siguiente middleware
 */
async function existeEstadoProcesal(req, res, next) {
  const { id } = req.params
  const estadoProcesal = await estadoProcesalDAO.obtenerEstadoProcesal(id)
  if (!estadoProcesal) {
    return res.status(404).json({
      message: 'No existe un estadoProcesal con ese id'
    })
  }
  next()
}

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

module.exports = {
  existeEstadoProcesal,
  existeProcesoJudicial
}
