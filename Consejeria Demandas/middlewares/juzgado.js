const juzgadoDAO = require('../data-access/juzgadoDAO')

async function existeJuzgado (req, res, next) {
  const { id } = req.params
  const juzgado = await juzgadoDAO.obtenerJuzgado(id)
  if (!juzgado) {
    return res.status(404).json({
      message: 'No existe un juzgado con ese id'
    })
  }
  next()
}

module.exports = {
  existeJuzgado,
}
