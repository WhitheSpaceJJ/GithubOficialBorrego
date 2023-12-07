const ocupacionDAO = require('../data-access/ocupacionDAO')

/**
 * @abstract Middleware que verifica si existe una ocupacion con el id proporcionado
 * @param {number} id - ID de la ocupacion a verificar
 * @returns {object} Retorna un mensaje de error si la ocupacion no existe, de lo contrario pasa al siguiente middleware
 */
async function existeOcupacion(req, res, next) {
  const { id } = req.params
  const ocupacion = await ocupacionDAO.obtenerOcupacion(id)
  if (!ocupacion) {
    return res.status(404).json({
      message: 'No existe una ocupacion con ese id'
    })
  }
  next()
}

/**
 * @abstract Middleware que verifica si existe una ocupacion con el id proporcionado
 * @param {number} id - ID de la ocupacion a verificar
 * @returns {object} Retorna un mensaje de error si la ocupacion no existe, de lo contrario pasa al siguiente middleware
 */
async function validateFormatoCrearJson(req, res, next) {
  const { descripcion_ocupacion } = req.body
  if (!descripcion_ocupacion) {
    return res.status(400).json({ message: "El campo descripcion ocupacion es obligatorio" })
  }
  next()
}

/**
 * @abstract Middleware que verifica si existe una ocupacion con el id proporcionado
 * @param {number} id - ID de la ocupacion a verificar
 * @returns {object} Retorna un mensaje de error si la ocupacion no existe, de lo contrario pasa al siguiente middleware
 */
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