const etniaDAO = require('../data-access/etniaDAO')

async function existeEtnia (req, res, next) {
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
