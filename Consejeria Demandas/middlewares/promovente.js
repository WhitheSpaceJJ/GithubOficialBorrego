const promoventeDAO = require('../data-access/promoventeDAO')
const participanteDAO = require('../data-access/participanteDAO')

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