const participanteDAO = require('../data-access/participanteDAO')

/**
 * @abstract Método que permite actualizar un participante
 * @param {number} id - ID del participante a actualizar
 * @param {object} data - Datos del participante a actualizar
 * @returns {object} Retorna el objeto del participante actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
const crearParticipante = async (req, res) => {
  try {
    const { nombre, edad, id_escolaridad, id_etnia, id_ocupacion, id_persona } = req.body
    const participante = await participanteDAO.crearParticipante({
      nombre,
      edad,
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

/**
 * @abstract Método que permite obtener todos los participantes
 * @returns {array} Retorna un arreglo de objetos de participantes si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerParticipantes = async (req, res) => {
  try {
    const participantes = await participanteDAO.obtenerParticipantes()
    if (participantes.length === 0) {
      return res.status(204).json(participantes)
    }
    res.json(participantes)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener un participante por su id
 * @param {number} id - ID del participante a obtener
 * @returns {object} Retorna el objeto del participante si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerParticipante = async (req, res) => {
  try {
    const { id } = req.params
    const participante = await participanteDAO.obtenerParticipante(Number(id))
    res.json(participante)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite actualizar un participante
 * @param {object} participante - Objeto que contiene los datos del participante
 * @returns {object} Retorna el objeto del participante actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarParticipante = async (req, res) => {
  try {
    const { id } = req.params
    const { id_participante, ...data } = req.body
    await participanteDAO.actualizarParticipante(Number(id), data)
    const actualizado = await participanteDAO.obtenerParticipante(Number(id))
    res.json(actualizado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite eliminar un participante
 * @param {number} id - ID del participante a eliminar
 * @returns {object} Retorna el objeto del participante eliminado si la operación fue exitosa, de lo contrario lanza un error
 */
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
