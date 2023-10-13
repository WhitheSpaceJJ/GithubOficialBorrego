const estado_procesal = require('../models/estado_procesal')

class EstadoProcesalDAO {
  async crearEstadoProcesal ({ descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial }) {
    try {
      const result = await estado_procesal.create({ descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial })
      return result
    } catch (error) {
      throw error
    }
  }

  async actualizarEstadoProcesal (id_estado_procesal, { descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial }) {
    try {
      const estadoProcesal = await estado_procesal.findByPk(id_estado_procesal)
      const result = await estadoProcesal.update({ descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial }, { where: { id_estado_procesal } })
      return result
    } catch (error) {
      throw error
    }
  }

  async eliminarEstadoProcesal (id_estado_procesal) {
    try {
      const deleteEstadoProcesal = await estado_procesal.findByPk(id_estado_procesal)
      await deleteEstadoProcesal.destroy()
      return 'Estado procesal eliminado con éxito'
    } catch (error) {
      throw error
    }
  }

  async obtenerEstadoProcesal (id_estado_procesal) {
    try {
      const estadoProcesal = await estado_procesal.findByPk(id_estado_procesal)
      return estadoProcesal
    } catch (error) {
      throw error
    }
  }

  async obtenerEstadosProcesales () {
    try {
      return await estado_procesal.findAll()
    } catch (error) {
      throw error
    }
  }
}

module.exports = new EstadoProcesalDAO()
