const Escolaridad = require('../models/escolaridad')

class EscolaridadDAO {
  async crearEscolaridad ({ descripcion }) {
    try {
      const escolaridad = await Escolaridad.create({ descripcion })
      return escolaridad
    } catch (err) {
      throw err
    }
  }

  async obtenerEscolaridades () {
    try {
      const escolaridades = await Escolaridad.findAll()
      return escolaridades
    } catch (err) {
      throw err
    }
  }

  async obtenerEscolaridadPorId (id) {
    try {
      const escolaridad = await Escolaridad.findByPk(id)
      return escolaridad
    } catch (err) {
      throw err
    }
  }

  async actualizarEscolaridad (id_escolaridad, { descripcion }) {
    try {
      const escolaridad = await Escolaridad.update({ descripcion }, { where: { id_escolaridad } })
      return escolaridad
    } catch (err) {
      throw err
    }
  }

  async eliminarEscolaridad (id) {
    try {
      const escolaridad = await Escolaridad.findByPk(id)
      await escolaridad.destroy()
      return 'Escolaridad eliminada con exito'
    } catch (err) {
      throw err
    }
  }
}

module.exports = new EscolaridadDAO()
