const juezDAO = require('../data-access/juezDAO')

async function existeJuez (req, res, next) {
  const { id } = req.params
  const juez = await juezDAO.obtenerJuez(id)
  if (!juez) {
    return res.status(404).json({
      message: 'No existe un juez con ese id'
    })
  }
  next()
}

module.exports = {
  existeJuez,
}
