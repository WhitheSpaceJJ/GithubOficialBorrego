const promoventeDAO = require('../data-access/promoventeDAO')

const crearPromovente = async (req, res) => {
  try {
    const { id_participante, espanol } = req.body
    const promovente = await promoventeDAO.crearPromovente({
      id_participante,
      espanol
    })
    res.json(promovente)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const obtenerPromoventes = async (req, res) => {
  try {
    const promoventes = await promoventeDAO.obtenerPromoventes()
    res.json(promoventes)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const obtenerPromovente = async (req, res) => {
  try {
    const { id } = req.params
    const promovente = await promoventeDAO.obtenerPromoventePorParticipante(Number(id))
    res.json(promovente)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const actualizarPromovente = async (req, res) => {
  try {
    const { id } = req.params
    const { id_participante, espanol } = req.body
    await promoventeDAO.actualizarPromovente(Number(id), {
      espanol
    })
    const actualizado = await promoventeDAO.obtenerPromoventePorParticipante(Number(id))
    res.json(actualizado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const eliminarPromovente = async (req, res) => {
  try {
    const { id } = req.params
    const promovente = await promoventeDAO.eliminarPromovente(Number(id))
    res.json(promovente)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

module.exports = {
  crearPromovente,
  obtenerPromoventes,
  obtenerPromovente,
  actualizarPromovente,
  eliminarPromovente
}
