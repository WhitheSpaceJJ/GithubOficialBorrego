const juzgadoDAO = require('../data-access/juzgadoDAO')

/**
 * @abstract Middleware que verifica si existe un juzgado con el id proporcionado
 * @param {number} id - ID del juzgado a verificar
 * @returns {object} Retorna un mensaje de error si el juzgado no existe, de lo contrario pasa al siguiente middleware
 */
async function existeJuzgado(req, res, next) {
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
