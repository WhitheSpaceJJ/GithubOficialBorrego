const Promovente = require('../models/promovente')

class PromoventeDAO {
  async crearPromovente ({ id_participante, espanol }) {
    try {
      const promovente = await Promovente.create({ id_participante, espanol })
      return promovente
    } catch (err) {
      throw err
    }
  }

  async obtenerPromoventes () {
    try {
      const promoventes = await Promovente.findAll()
      return promoventes
    } catch (err) {
      throw err
    }
  }

  async obtenerPromoventePorParticipante (idParticipante) {
    try {
      const promovente = await Promovente.findOne({ where: { id_participante: idParticipante } })
      return promovente
    } catch (err) {
      throw err
    }
  }

  async actualizarPromovente (idParticipante, { id_participante, espanol }) {
    try {
      const promovente = await Promovente.findOne({ where: { id_participante: idParticipante } })
      const promoventeActualizado = await promovente.update({ id_participante, espanol })
      return promoventeActualizado
    } catch (err) {
      throw err
    }
  }

  async eliminarPromovente (idParticipante) {
    try {
      const promovente = await Promovente.findOne({ where: { id_participante: idParticipante } })
      await promovente.destroy()
      return 'Promovente eliminado con éxito'
    } catch (err) {
      throw err
    }
  }
}

module.exports = new PromoventeDAO()
