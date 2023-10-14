const imputadoDAO = require('../data-access/imputadoDAO')

async function existeImputado (req, res, next) {
  const { id } = req.params
  const imputado = await imputadoDAO.obtenerImputado(id)
  if (!imputado) {
    return res.status(404).json({
      message: 'No existe una imputado con ese id'
    })
  }
  next()
}

module.exports = {
  existeImputado,
}
