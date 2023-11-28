const Denuncia = require('../models/denuncia')
class DenunciaDAO {

  /**
   * @abstract Método que permite crear una denuncia en la base de datos
   * @param {object} denuncia - Objeto que contiene los datos de la denuncia
   * @returns {object} Retorna el objeto de la denuncia creada si la operación fue exitosa, de lo contrario lanza un error
   */
  async crearDenuncia({ id_proceso_judicial, causa_penal, delito, modalidad, hechos, plazo_cierre, unidad_mp, estrategia, id_juez }) {
    try {
      const denuncia = await Denuncia.create({ id_proceso_judicial, causa_penal, delito, modalidad, hechos, plazo_cierre, unidad_mp, estrategia, id_juez })
      return denuncia
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite obtener todas las denuncias de la base de datos
   * @returns {array} Retorna un arreglo de objetos de denuncias si la operación fue exitosa, de lo contrario lanza un error
   */
  async obtenerDenuncias() {
    try {
      const denuncias = await Denuncia.findAll()
      return denuncias
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite obtener una denuncia de la base de datos por su id
   * @param {number} id - ID de la denuncia a obtener
   * @returns {object} Retorna el objeto de la denuncia si la operación fue exitosa, de lo contrario lanza un error
   */
  async obtenerDenuncia(id) {
    try {
      const denuncia = await Denuncia.findByPk(id)
      return denuncia
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite actualizar una denuncia en la base de datos
   * @param {number} id_denuncia - ID de la denuncia a actualizar
   * @param {object} denuncia - Objeto que contiene los nuevos datos de la denuncia
   * @returns {object} Retorna el objeto de la denuncia actualizada si la operación fue exitosa, de lo contrario lanza un error
   */
  async actualizarDenuncia(id_denuncia, { id_proceso_judicial, causa_penal, delito, modalidad, hechos, plazo_cierre, unidad_mpi, estrategia, id_juez }) {
    try {
      const denuncia = await Denuncia.update({ id_proceso_judicial, causa_penal, delito, modalidad, hechos, plazo_cierre, unidad_mpi, estrategia, id_juez }, { where: { id_denuncia } })
      return denuncia
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite eliminar una denuncia de la base de datos
   * @param {number} id - ID de la denuncia a eliminar
   * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
   */
  async eliminarDenuncia(id) {
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
