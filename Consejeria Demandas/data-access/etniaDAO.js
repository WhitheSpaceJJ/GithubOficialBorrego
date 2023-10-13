const Etnia = require('../models/etnia')

class EtniaDAO {
  async crearEtnia ({ nombre }) {
    try {
      const etnia = await Etnia.create({ nombre })
      return etnia
    } catch (err) {
      throw err
    }
  }

  async obtenerEtnias () {
    try {
      const etnias = await Etnia.findAll()
      return etnias
    } catch (err) {
      throw err
    }
  }

  async obtenerEtnia (id) {
    try {
      const etnia = await Etnia.findByPk(id)
      return etnia
    } catch (err) {
      throw err
    }
  }

  async actualizarEtnia (id_etnia, { nombre }) {
    try {
      const etnia = await Etnia.update({ nombre }, { where: { id_etnia } })
      return etnia
    } catch (err) {
      throw err
    }
  }

  async eliminarEtnia (id) {
    try {
      const etnia = await Etnia.findByPk(id)
      await etnia.destroy()
      return 'Etnia eliminada con éxito'
    } catch (err) {
      throw err
    }
  }
}

module.exports = new EtniaDAO()
