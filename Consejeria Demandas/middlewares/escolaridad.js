const escolaridadDAO = require('../data-access/escolaridadDAO')

/**
 * @abstract Middleware que verifica si existe una escolaridad con el id proporcionado
 * @param {number} id - ID de la escolaridad a verificar
 * @returns {object} Retorna un mensaje de error si la escolaridad no existe, de lo contrario pasa al siguiente middleware
 */
async function existeEscolaridad(req, res, next) {
  const { id } = req.params
  const escolaridad = await escolaridadDAO.obtenerEscolaridadPorId(id)
  if (!escolaridad) {
    return res.status(404).json({
      message: 'No existe una escolaridad con ese id'
    })
  }
  next()
}

module.exports = {
  existeEscolaridad
}
