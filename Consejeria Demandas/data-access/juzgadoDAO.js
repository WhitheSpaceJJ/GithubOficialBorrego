const Juzgado = require('../models/juzgado')

class JuzgadoDAO {
  async crearJuzgado ({ nombre_juzgado }) {
    try {
      const juzgado = await Juzgado.create({ nombre_juzgado })
      return juzgado
    } catch (err) {
      throw err
    }
  }

  async obtenerJuzgados () {
    try {
      const juzgados = await Juzgado.findAll()
      return juzgados
    } catch (err) {
      throw err
    }
  }

  async obtenerJuzgado (id) {
    try {
      const juzgado = await Juzgado.findByPk(id)
      return juzgado
    } catch (err) {
      throw err
    }
  }

  async actualizarJuzgado (id_juzgado, { nombre_juzgado }) {
    try {
      const juzgado = await Juzgado.update({ nombre_juzgado }, { where: { id_juzgado } })
      return juzgado
    } catch (err) {
      throw err
    }
  }

  async eliminarJuzgado (id) {
    try {
      const juzgado = await Juzgado.findByPk(id)
      await juzgado.destroy()
      return 'Juzgado eliminado con éxito'
    } catch (err) {
      throw err
    }
  }
}

module.exports = new JuzgadoDAO()
