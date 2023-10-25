const Participante = require('../models/participante')

class ParticipanteDAO {
  async crearParticipante ({ nombre, edad, DTYPE, id_escolaridad, id_etnia, id_ocupacion, id_persona }) {
    try {
      const participante = await Participante.create({ nombre, edad, DTYPE, id_escolaridad, id_etnia, id_ocupacion, id_persona })
      return participante
    } catch (err) {
      throw err
    }
  }

  async obtenerParticipantes () {
    try {
      const participantes = await Participante.findAll()
      return participantes
    } catch (err) {
      throw err
    }
  }

  async obtenerParticipante (id) {
    try {
      const participante = await Participante.findByPk(id)
      return participante
    } catch (err) {
      throw err
    }
  }

  async actualizarParticipante (id_participante, { nombre, edad, DTYPE, id_escolaridad, id_etnia, id_ocupacion, id_persona }) {
    try {
      const participante = await Participante.update({ nombre, edad, DTYPE, id_escolaridad, id_etnia, id_ocupacion, id_persona }, { where: { id_participante } })
      return participante
    } catch (err) {
      throw err
    }
  }

  async eliminarParticipante (id) {
    try {
      const participante = await Participante.findByPk(id)
      await participante.destroy()
      return 'participante eliminado con exito'
    } catch (err) {
      throw err
    }
  }
}

module.exports = new ParticipanteDAO()
