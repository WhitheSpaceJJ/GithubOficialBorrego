const escolaridadDAO = require('../data-access/escolaridadDAO')

async function existeEscolaridad (req, res, next) {
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
