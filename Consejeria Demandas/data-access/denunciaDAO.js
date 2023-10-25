const Denuncia = require('../models/denuncia')
class DenunciaDAO {
  async crearDenuncia ({ id_proceso_judicial, causa_penal, delito, modalidad, hechos, plazo_cierre, unidad_mp, estrategia, id_juez }) {
    try {
      const denuncia = await Denuncia.create({ id_proceso_judicial, causa_penal, delito, modalidad, hechos, plazo_cierre, unidad_mp, estrategia, id_juez })
      return denuncia
    } catch (err) {
      throw err
    }
  }

  async obtenerDenuncias () {
    try {
      const denuncias = await Denuncia.findAll()
      return denuncias
    } catch (err) {
      throw err
    }
  }

  async obtenerDenuncia (id) {
    try {
      const denuncia = await Denuncia.findByPk(id)
      return denuncia
    } catch (err) {
      throw err
    }
  }

  async actualizarDenuncia (id_denuncia, { id_proceso_judicial, causa_penal, delito, modalidad, hechos, plazo_cierre, unidad_mpi, estrategia, id_juez }) {
    try {
      const denuncia = await Denuncia.update({ id_proceso_judicial, causa_penal, delito, modalidad, hechos, plazo_cierre, unidad_mpi, estrategia, id_juez }, { where: { id_denuncia } })
      return denuncia
    } catch (err) {
      throw err
    }
  }

  async eliminarDenuncia (id) {
    try {
      const denuncia = await Denuncia.findByPk(id)
      await denuncia.destroy()
      return 'Denuncia eliminada con éxito'
    } catch (e) {
      throw e
    }
  }
}

module.exports = new DenunciaDAO()
