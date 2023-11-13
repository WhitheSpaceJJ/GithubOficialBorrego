const juzgadoDAO = require('../data-access/juzgadoDAO')
const procesoJudicialDAO = require('../data-access/proceso_judicialDAO')

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
