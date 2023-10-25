const Ocupacion = require('../models/ocupacion')

class OcupacionDAO {
  async crearOcupacion ({ descripcion_ocupacion }) {
    try {
      const ocupacion = await Ocupacion.create({ descripcion_ocupacion })
      return ocupacion
    } catch (err) {
      throw err
    }
  }

  async obtenerOcupaciones () {
    try {
      const ocupaciones = await Ocupacion.findAll()
      return ocupaciones
    } catch (err) {
      throw err
    }
  }

  async obtenerOcupacion (id) {
    try {
      const ocupacion = await Ocupacion.findByPk(id)
      return ocupacion
    } catch (err) {
      throw err
    }
  }

  async actualizarOcupacion (id_ocupacion, { descripcion_ocupacion }) {
    try {
      const ocupacion = await Ocupacion.update({ descripcion_ocupacion }, { where: { id_ocupacion } })
      return ocupacion
    } catch (err) {
      throw err
    }
  }

  async eliminarOcupacion (id) {
    try {
      const ocupacion = await Ocupacion.findByPk(id)
      await ocupacion.destroy()
      return 'Ocupación eliminada con éxito'
    } catch (err) {
      throw err
    }
  }
}

module.exports = new OcupacionDAO()
