const etniaDAO = require('../data-access/etniaDAO')

/**
 * @abstract Middleware que verifica si existe una etnia con el id proporcionado
 * @param {number} id - ID de la etnia a verificar
 * @returns {object} Retorna un mensaje de error si la etnia no existe, de lo contrario pasa al siguiente middleware
 */
async function existeEtnia(req, res, next) {
  const { id } = req.params
  const etnia = await etniaDAO.obtenerEtnia(id)
  if (!etnia) {
    return res.status(404).json({
      message: 'No existe una etnia con ese id'
    })
  }
  next()
}

module.exports = {
  existeEtnia,
}
