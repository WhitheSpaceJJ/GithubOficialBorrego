const Demanda = require('../models/demanda')

class DemandaDAO {
  async crearDemanda ({ id_proceso_judicial, tipo_demanda, descripcion_demanda, fecha_demanda }) {
    try {
      const result = await Demanda.create({ id_proceso_judicial, tipo_demanda, descripcion_demanda, fecha_demanda })
      return result
    } catch (error) {
      throw error
    }
  }

  async actualizarDemanda (id_demanda, { id_proceso_judicial, tipo_demanda, descripcion_demanda, fecha_demanda }) {
    try {
      const demanda = await Demanda.findByPk(id_demanda)
      const result = await demanda.update({ id_proceso_judicial, tipo_demanda, descripcion_demanda, fecha_demanda }, { where: { id_demanda } })
      return result
    } catch (error) {
      throw error
    }
  }

  async eliminarDemanda (id) {
    try {
      const deleteDemanda = await Demanda.findByPk(id)
      await deleteDemanda.destroy()
      return 'Demanda eliminada con éxito'
    } catch (error) {
      throw error
    }
  }

  async obtenerDemanda (id) {
    try {
      const demanda = await Demanda.findByPk(id)
      return demanda
    } catch (error) {
      throw error
    }
  }

  async obtenerDemandas () {
    try {
      return await Demanda.findAll()
    } catch (error) {
      throw error
    }
  }
}

module.exports = new DemandaDAO()
