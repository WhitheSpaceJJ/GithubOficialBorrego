const estadoProcesalDAO = require('../data-access/estado_procesalDAO')
const procesoJudicialDAO = require('../data-access/proceso_judicialDAO')

async function existeEstadoProcesal (req, res, next) {
  const { id } = req.params
  const estadoProcesal = await estadoProcesalDAO.obtenerEstadoProcesal(id)
  if (!estadoProcesal) {
    return res.status(404).json({
      message: 'No existe un estadoProcesal con ese id'
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
  existeEstadoProcesal,
  existeProcesoJudicial
}
