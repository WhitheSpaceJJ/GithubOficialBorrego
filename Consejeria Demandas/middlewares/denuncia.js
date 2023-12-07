const denunciaDAO = require('../data-access/denunciaDAO')
const procesoJudicialDAO = require('../data-access/proceso_judicialDAO')
const juezDAO = require('../data-access/juezDAO')

/**
 * @abstract Middleware que verifica si existe una denuncia con el id proporcionado
 * @param {number} id - ID de la denuncia a verificar
 * @returns {object} Retorna un mensaje de error si la denuncia no existe, de lo contrario pasa al siguiente middleware
 */
async function existeDenuncia(req, res, next) {
  const { id } = req.params
  const denuncia = await denunciaDAO.obtenerDenuncia(id)
  if (!denuncia) {
    return res.status(404).json({
      message: 'No existe una denuncia con ese id'
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

/**
 * @abstract Middleware que verifica si existe un juez con el id proporcionado
 * @param {number} id_juez - ID del juez a verificar
 * @returns {object} Retorna un mensaje de error si el juez no existe, de lo contrario pasa al siguiente middleware
 */
async function existeJuez(req, res, next) {
  const { id_juez } = req.body
  const juez = await juezDAO.obtenerJuez(id_juez)
  if (!juez) {
    return res.status(404).json({
      message: 'No existe un juez con ese id'
    })
  }
  next()
}

module.exports = {
  existeDenuncia,
  existeProcesoJudicial,
  existeJuez
}
