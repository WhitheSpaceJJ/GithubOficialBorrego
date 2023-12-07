const promoventeDAO = require('../data-access/promoventeDAO')
const participanteDAO = require('../data-access/participanteDAO')

/**
 * @abstract Middleware que verifica si existe un promovente con el id proporcionado
 * @param {number} id - ID del promovente a verificar
 * @returns {object} Retorna un mensaje de error si el promovente no existe, de lo contrario pasa al siguiente middleware
 */
async function existePromovente(req, res, next) {
    const { id } = req.params
    const demanda = await promoventeDAO.obtenerPromovente(id)
    if (!demanda) {
        return res.status(404).json({
            message: 'No existe un promovente con ese id'
        })
    }
    next()
}

/**
 * @abstract Middleware que verifica si existe un participante con el id proporcionado
 * @param {number} id - ID del participante a verificar
 * @returns {object} Retorna un mensaje de error si el participante no existe, de lo contrario pasa al siguiente middleware
 */
async function existeParticipante(req, res, next) {
    const { id_participante } = req.body
    const participante = await participanteDAO.obtenerParticipante(id_participante)
    if (!participante) {
        return res.status(404).json({
            message: 'No existe un participante con ese id'
        })
    }
    next()
}

module.exports = {
    existePromovente,
    existeParticipante
}