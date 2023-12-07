const demandaDAO = require('../data-access/demandaDAO')
const procesoJudicialDAO = require('../data-access/proceso_judicialDAO')

/**
 * @abstract Middleware que verifica si existe una demanda con el id proporcionado
 * @param {number} id - ID de la demanda a verificar
 * @returns {object} Retorna un mensaje de error si la demanda no existe, de lo contrario pasa al siguiente middleware
 */
async function existeDemanda(req, res, next) {
  const { id } = req.params
  const demanda = await demandaDAO.obtenerDemanda(id)
  if (!demanda) {
    return res.status(404).json({
      message: 'No existe una demanda con ese id'
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
  existeDemanda,
  existeProcesoJudicial
}
