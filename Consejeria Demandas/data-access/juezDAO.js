const Juez = require('../models/juez')

class JuezDAO {
  async crearJuez ({ nombre_juez }) {
    try {
      const juez = await Juez.create({ nombre_juez })
      return juez
    } catch (e) {
      throw e
    }
  }

  async obtenerJueces () {
    try {
      const juez = await Juez.findAll()
      return juez
    } catch (e) {
      throw e
    }
  }

  async obtenerJuez (id) {
    try {
      const juez = await Juez.findByPk(id)
      return juez
    } catch (e) {
      throw e
    }
  }

  async actualizarJuez (id_juez, { nombre_juez }) {
    try {
      const juez = await Juez.update({ nombre_juez }, { where: { id_juez } })
      return juez
    } catch (e) {
      throw e
    }
  }

  async eliminarJuez (id_juez) {
    try {
      await Juez.destroy({ where: { id_juez } })
      return 'Juez eliminado con éxito'
    } catch (e) {
      throw e
    }
  }
}

module.exports = new JuezDAO()
