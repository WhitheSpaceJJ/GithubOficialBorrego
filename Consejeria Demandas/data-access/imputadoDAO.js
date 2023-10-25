const Imputado = require('../models/Imputado')

class ImputadoDAO {
  async crearImputado ({ id_participante, delito }) {
    try {
      const imputado = await Imputado.create({ id_participante, delito })
      return imputado
    } catch (err) {
      throw err
    }
  }

  async obtenerImputados () {
    try {
      const imputados = await Imputado.findAll()
      return imputados
    } catch (err) {
      throw err
    }
  }

  async obtenerImputado (id) {
    try {
      const imputado = await Imputado.findByPk(id)
      return imputado
    } catch (err) {
      throw err
    }
  }

  async actualizarImputado (idParticipante, { delito }) {
    try {
      const imputado = await Imputado.update({ delito }, { where: { id_participante: idParticipante } })
      return imputado
    } catch (err) {
      throw err
    }
  }

  async eliminarImputado (id) {
    try {
      const imputado = await Imputado.findByPk(id)
      await imputado.destroy()
      return 'Imputado eliminado con exito.'
    } catch (err) {
      throw err
    }
  }
}

module.exports = new ImputadoDAO()
