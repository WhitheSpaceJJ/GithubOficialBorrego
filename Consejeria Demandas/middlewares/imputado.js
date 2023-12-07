const imputadoDAO = require('../data-access/imputadoDAO')

/**
 * @abstract Middleware que verifica si existe un imputado con el id proporcionado
 * @param {number} id - ID del imputado a verificar
 * @returns {object} Retorna un mensaje de error si el imputado no existe, de lo contrario pasa al siguiente middleware
 */
async function existeImputado(req, res, next) {
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
