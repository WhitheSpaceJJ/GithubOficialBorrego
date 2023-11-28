const estado_procesal = require('../models/estado_procesal')

class EstadoProcesalDAO {
  /**
   * @abstract Método que permite crear un estado procesal en la base de datos
   * @param {object} estadoProcesal - Objeto que contiene los datos del estado procesal
   * @returns {object} Retorna el objeto del estado procesal creado si la operación fue exitosa, de lo contrario lanza un error
   */
  async crearEstadoProcesal({ descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial }) {
    try {
      const result = await estado_procesal.create({ descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial })
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * @abstract Método que permite actualizar un estado procesal en la base de datos
   * @param {number} id_estado_procesal - ID del estado procesal a actualizar
   * @param {object} estadoProcesal - Objeto que contiene los nuevos datos del estado procesal
   * @returns {object} Retorna el objeto del estado procesal actualizado si la operación fue exitosa, de lo contrario lanza un error
   */
  async actualizarEstadoProcesal(id_estado_procesal, { descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial }) {
    try {
      const estadoProcesal = await estado_procesal.findByPk(id_estado_procesal)
      const result = await estadoProcesal.update({ descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial }, { where: { id_estado_procesal } })
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * @abstract Método que permite eliminar un estado procesal de la base de datos
   * @param {number} id_estado_procesal - ID del estado procesal a eliminar
   * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
   */
  async eliminarEstadoProcesal(id_estado_procesal) {
    try {
      const deleteEstadoProcesal = await estado_procesal.findByPk(id_estado_procesal)
      await deleteEstadoProcesal.destroy()
      return 'Estado procesal eliminado con éxito'
    } catch (error) {
      throw error
    }
  }

  /**
   * @abstract Método que permite obtener un estado procesal de la base de datos por su id
   * @param {number} id_estado_procesal - ID del estado procesal a obtener
   * @returns {object} Retorna el objeto del estado procesal si la operación fue exitosa, de lo contrario lanza un error
   */
  async obtenerEstadoProcesal(id_estado_procesal) {
    try {
      const estadoProcesal = await estado_procesal.findByPk(id_estado_procesal)
      return estadoProcesal
    } catch (error) {
      throw error
    }
  }

  /**
   * @abstract Método que permite obtener todos los estados procesales de la base de datos
   * @returns {array} Retorna un arreglo de objetos de estados procesales si la operación fue exitosa, de lo contrario lanza un error
   */
  async obtenerEstadosProcesales() {
    try {
      return await estado_procesal.findAll()
    } catch (error) {
      throw error
    }
  }
}

module.exports = new EstadoProcesalDAO()
