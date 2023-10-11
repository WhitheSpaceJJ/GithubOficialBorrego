const Juez = require('../models/juez')

class JuezDAO {
  constructor () {}

  async crearJuez ({ nombre_juez }) {
    try {
      const juez = await Juez.create({ nombre_juez })
      return juez
    } catch (e) {
      throw e
    }
  }

  async obtenerTodosJuez () {
    try {
      const juez = await Juez.findAll()
      return juez
    } catch (e) {
      throw e
    }
  }

  async obtenerJuezPorId (id) {
    try {
      const juez = await Juez.findByPk(id)
      return juez
    } catch (e) {
      throw e
    }
  }

  async actualizarJuez (id, { nombre_juez }) {
    try {
      const juez = await Juez.update({ nombre_juez }, { where: { id } })
      return juez
    } catch (e) {
      throw e
    }
  }

  async borrarJuez (id) {
    try {
      const juez = await Juez.destroy({ where: { id } })
      return juez
    } catch (e) {
      throw e
    }
  }
}

module.exports = new JuezDAO()
