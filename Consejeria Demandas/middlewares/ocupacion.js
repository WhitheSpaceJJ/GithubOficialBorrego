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

function validateFormatoCrearJson(req, res, next) {
  const { descripcion_ocupacion } = req.body
  if (!descripcion_ocupacion) {
    return res.status(400).json({ message: "El campo descripcion ocupacion es obligatorio" })
  }
  next()
}

async function validateActualizarOcupacion(req, res, next) {
  try {
    const ocupacion = await ocupacionDAO.obtenerOcupacion(req.params.id);
    if (!ocupacion) {
      return res.status(404).json({
        message: 'No existe ocupacion con ese id'
      })
    }
  } catch (error) {
    return res.status(400).json({ message: "El id no es valido" })
  }
  const { descripcion_ocupacion } = req.body
  if (!descripcion_ocupacion) {
    return res.status(400).json({ message: "El campo descripcion ocupacion es obligatorio" })
  }
  next()
}

module.exports = {
    existeOcupacion,
    validateFormatoCrearJson,
    validateActualizarOcupacion
}