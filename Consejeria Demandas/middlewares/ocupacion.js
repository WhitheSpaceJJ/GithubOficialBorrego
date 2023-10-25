const ocupacionDAO = require('../data-access/ocupacionDAO')

async function existeOcupacion (req, res, next) {
  const { id } = req.params
  const ocupacion = await ocupacionDAO.obtenerOcupacion(id)
  if (!ocupacion) {
    return res.status(404).json({
      message: 'No existe una ocupacion con ese id'
    })
  }
  next()
}

module.exports = {
    existeOcupacion
}