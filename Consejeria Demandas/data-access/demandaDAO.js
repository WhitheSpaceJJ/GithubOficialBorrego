const Demanda = require('../models/demanda')

class DemandaDAO {

  /**
   * @abstract Método que permite crear una demanda en la base de datos
   * @param {object} demanda - Objeto que contiene los datos de la demanda
   * @returns {object} Retorna el objeto de la demanda creada si la operación fue exitosa, de lo contrario lanza un error
   */
  async crearDemanda({ id_proceso_judicial, tipo_demanda, descripcion_demanda, fecha_demanda }) {
    try {
      const result = await Demanda.create({ id_proceso_judicial, tipo_demanda, descripcion_demanda, fecha_demanda })
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * @abstract Método que permite actualizar una demanda en la base de datos
   * @param {number} id_demanda - ID de la demanda a actualizar
   * @param {object} demanda - Objeto que contiene los nuevos datos de la demanda
   * @returns {object} Retorna el objeto de la demanda actualizada si la operación fue exitosa, de lo contrario lanza un error
   */
  async actualizarDemanda(id_demanda, { id_proceso_judicial, tipo_demanda, descripcion_demanda, fecha_demanda }) {
    try {
      const demanda = await Demanda.findByPk(id_demanda)
      const result = await demanda.update({ id_proceso_judicial, tipo_demanda, descripcion_demanda, fecha_demanda }, { where: { id_demanda } })
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * @abstract Método que permite eliminar una demanda de la base de datos
   * @param {number} id - ID de la demanda a eliminar
   * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
   */
  async eliminarDemanda(id) {
    try {
      const deleteDemanda = await Demanda.findByPk(id)
      await deleteDemanda.destroy()
      return 'Demanda eliminada con éxito'
    } catch (error) {
      throw error
    }
  }

  /**
   * @abstract Método que permite obtener una demanda de la base de datos por su id
   * @param {number} id - ID de la demanda a obtener
   * @returns {object} Retorna el objeto de la demanda si la operación fue exitosa, de lo contrario lanza un error
   */
  async obtenerDemanda(id) {
    try {
      const demanda = await Demanda.findByPk(id)
      return demanda
    } catch (error) {
      throw error
    }
  }

  /**
   * @abstract Método que permite obtener todas las demandas de la base de datos
   * @returns {array} Retorna un arreglo de objetos de demandas si la operación fue exitosa, de lo contrario lanza un error
   */
  async obtenerDemandas() {
    try {
      return await Demanda.findAll()
    } catch (error) {
      throw error
    }
  }
}

module.exports = new DemandaDAO()
