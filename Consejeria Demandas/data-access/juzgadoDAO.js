const Juzgado = require('../models/juzgado')

class JuzgadoDAO {
  constructor () {}

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

  async obtenerJuzgadoPorId (id) {
    try {
      const juzgado = await Juzgado.findByPk(id)
      return juzgado
    } catch (err) {
      throw err
    }
  }

  async actualizarJuzgado (id, { nombre_juzgado }) {
    try {
      const juzgado = await Juzgado.update({ nombre_juzgado }, { where: { id } })
      return juzgado
    } catch (err) {
      throw err
    }
  }

  async eliminarJuzgado (id) {
    try {
      const juzgado = await Juzgado.findByPk(id)
      if (!juzgado) {
        throw new Error('No existe el juzgado')
      }
      await juzgado.destroy()
      return 'Juzgado eliminado con éxito'
    } catch (err) {
      throw err
    }
  }
}

module.exports = new JuzgadoDAO()
