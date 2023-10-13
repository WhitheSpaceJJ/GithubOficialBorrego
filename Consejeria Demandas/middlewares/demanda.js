const demandaDAO = require('../data-access/demandaDAO')
const procesoJudicialDAO = require('../data-access/proceso_judicialDAO')

async function existeDemanda (req, res, next) {
  const { id } = req.params
  const demanda = await demandaDAO.obtenerDemanda(id)
  if (!demanda) {
    return res.status(404).json({
      message: 'No existe una demanda con ese id'
    })
  }
  next()
}

async function existeProcesoJudicial (req, res, next) {
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
