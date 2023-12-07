const participanteDAO = require('../data-access/participanteDAO')
const escolaridadDAO = require('../data-access/escolaridadDAO')
const etniaDAO = require('../data-access/etniaDAO')
const ocupacionDAO = require('../data-access/ocupacionDAO')

/**
 * @abstract Middleware que verifica si existe un participante con el id proporcionado
 * @param {number} id - ID del participante a verificar
 * @returns {object} Retorna un mensaje de error si el participante no existe, de lo contrario pasa al siguiente middleware
 */
async function existeParticipante(req, res, next) {
  const { id } = req.params
  const participante = await participanteDAO.obtenerParticipante(id)
  if (!participante) {
    return res.status(404).json({
      message: 'No existe un participante con ese id'
    })
  }
  next()
}

/**
 * @abstract Middleware que verifica si existe una escolaridad con el id proporcionado
 * @param {number} id - ID de la escolaridad a verificar
 * @returns {object} Retorna un mensaje de error si la escolaridad no existe, de lo contrario pasa al siguiente middleware
 */
async function existeEscolaridad(req, res, next) {
  const { id_escolaridad } = req.body
  const escolaridad = await escolaridadDAO.obtenerEscolaridadPorId(id_escolaridad)
  if (!escolaridad) {
    return res.status(404).json({
      message: 'No existe un proceso judicial con ese id'
    })
  }
  next()
}

/**
 * @abstract Middleware que verifica si existe una etnia con el id proporcionado
 * @param {number} id - ID de la etnia a verificar
 * @returns {object} Retorna un mensaje de error si la etnia no existe, de lo contrario pasa al siguiente middleware
 */
async function existeEtnia(req, res, next) {
  const { id_etnia } = req.body
  const etnia = await etniaDAO.obtenerEtnia(id_etnia)
  if (!etnia) {
    return res.status(404).json({
      message: 'No existe una etnia con ese id'
    })
  }
  next()
}

/**
 * @abstract Middleware que verifica si existe una ocupacion con el id proporcionado
 * @param {number} id - ID de la ocupacion a verificar
 * @returns {object} Retorna un mensaje de error si la ocupacion no existe, de lo contrario pasa al siguiente middleware
 */
async function existeOcupacion(req, res, next) {
  const { id_ocupacion } = req.body
  const ocupacion = await ocupacionDAO.obtenerOcupacion(id_ocupacion)
  if (!ocupacion) {
    return res.status(404).json({
      message: 'No existe una ocupacion con ese id'
    })
  }
  next()
}

module.exports = {
  existeParticipante,
  existeEscolaridad,
  existeEtnia,
  existeOcupacion
}
