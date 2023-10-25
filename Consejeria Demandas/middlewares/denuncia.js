const denunciaDAO = require('../data-access/denunciaDAO')
const procesoJudicialDAO = require('../data-access/proceso_judicialDAO')
const juezDAO = require('../data-access/juezDAO')

async function existeDenuncia (req, res, next) {
  const { id } = req.params
  const denuncia = await denunciaDAO.obtenerDenuncia(id)
  if (!denuncia) {
    return res.status(404).json({
      message: 'No existe una denuncia con ese id'
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

async function existeJuez (req, res, next) {
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
