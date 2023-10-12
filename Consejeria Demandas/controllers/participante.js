const participanteDAO = require('../data-access/participanteDAO')

const crearParticipante = async (req, res) => {
  try {
    const { nombre, edad, DTYPE, id_escolaridad, id_etnia, id_ocupacion, id_persona } = req.body
    const participante = await participanteDAO.crearParticipante({
      nombre,
      edad,
      DTYPE,
      id_escolaridad,
      id_etnia,
      id_ocupacion,
      id_persona
    })
    res.json(participante)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const obtenerParticipantes = async (req, res) => {
  try {
    const participantes = await participanteDAO.obtenerParticipantes()
    res.json(participantes)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const obtenerParticipante = async (req, res) => {
  try {
    const { id } = req.params
    const participante = await participanteDAO.obtenerParticipantePorId(Number(id))
    res.json(participante)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const actualizarParticipante = async (req, res) => {
  try {
    const { id } = req.params
    const { id_participante, ...data } = req.body
    await participanteDAO.actualizarParticipante(Number(id), data)
    const actualizado = await participanteDAO.obtenerParticipantePorId(Number(id))
    res.json(actualizado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const eliminarParticipante = async (req, res) => {
  try {
    const { id } = req.params
    const participante = await participanteDAO.eliminarParticipante(Number(id))
    res.json(participante)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

module.exports = {
  crearParticipante,
  obtenerParticipantes,
  obtenerParticipante,
  actualizarParticipante,
  eliminarParticipante
}
