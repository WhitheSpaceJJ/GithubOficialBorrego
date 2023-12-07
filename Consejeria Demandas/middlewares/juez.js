const juezDAO = require('../data-access/juezDAO')

/**
 * @abstract Middleware que verifica si existe un juez con el id proporcionado
 * @param {number} id - ID del juez a verificar
 * @returns {object} Retorna un mensaje de error si el juez no existe, de lo contrario pasa al siguiente middleware
 */
async function existeJuez(req, res, next) {
  const { id } = req.params
  const juez = await juezDAO.obtenerJuez(id)
  if (!juez) {
    return res.status(404).json({
      message: 'No existe un juez con ese id'
    })
  }
  next()
}

/**
 * @abstract Middleware que verifica si el formato del JSON es correcto
 * @param {String} nombre_juez - Nombre del juez
 * @returns {object} Retorna un mensaje de error si el formato del JSON es incorrecto, de lo contrario pasa al siguiente middleware
 */
async function validateFormatoCrearJson(req, res, next) {
  const { nombre_juez } = req.body
  if (!nombre_juez) {
    return res.status(400).json({ message: "El campo nombre es obligatorio" })
  }
  next()
}

/**
 * @abstract Middleware que verifica si existe un juez con el id proporcionado
 * @param {number} id - ID del juez a verificar
 * @param {String} nombre_juez - Nombre del juez
 * @returns {object} Retorna un mensaje de error si el juez no existe, de lo contrario pasa al siguiente middleware
 */
async function validateActualizarJuez(req, res, next) {
  try {
    const juez = await juezDAO.obtenerJuez(req.params.id);
    if (!juez) {
      return res.status(404).json({
        message: 'No existe juez con ese id'
      })
    }
  } catch (error) {
    return res.status(400).json({ message: "El id no es valido" })
  }
  const { nombre_juez } = req.body
  if (!nombre_juez) {
    return res.status(400).json({ message: "El campo nombre es obligatorio" })
  }
  next()
}

module.exports = {
  existeJuez,
  validateFormatoCrearJson,
  validateActualizarJuez
}
