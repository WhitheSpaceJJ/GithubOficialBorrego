const juezDAO = require('../data-access/juezDAO')

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

function validateFormatoCrearJson(req, res, next) {
  const { nombre_juez } = req.body
  if (!nombre_juez) {
    return res.status(400).json({ message: "El campo nombre es obligatorio" })
  }
  next()
}

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
