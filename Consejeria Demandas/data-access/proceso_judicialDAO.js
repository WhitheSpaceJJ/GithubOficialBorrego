const proceso_judicial = require('../models/proceso_judicial')

class ProcesoJudicialDAO {

  /**
 * @abstract Método que permite crear un proceso judicial en la base de datos
 * @param {object} procesoJudicial - Objeto que contiene los datos del proceso judicial
 * @returns {object} Retorna el objeto del proceso judicial creado si la operación fue exitosa, de lo contrario lanza un error
 */
  async crearProcesoJudicial({ fecha_inicio, fecha_proceso, fecha_conclusion, area_seguimiento, numero_expediente, id_juzgado }) {
    try {
      const procesoJudicial = await proceso_judicial.create({ fecha_inicio, fecha_proceso, fecha_conclusion, area_seguimiento, numero_expediente, id_juzgado })
      return procesoJudicial
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener todos los procesos judiciales de la base de datos
 * @returns {array} Retorna un arreglo de objetos de procesos judiciales si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerProcesosJudiciales() {
    try {
      const procesosJudiciales = await proceso_judicial.findAll()
      return procesosJudiciales
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener un proceso judicial de la base de datos por su id
 * @param {number} id - ID del proceso judicial a obtener
 * @returns {object} Retorna el objeto del proceso judicial si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerProcesoJudicial(id) {
    try {
      const procesoJudicial = await proceso_judicial.findByPk(id)
      return procesoJudicial
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite actualizar un proceso judicial en la base de datos
 * @param {number} id_proceso_judicial - ID del proceso judicial a actualizar
 * @param {object} procesoJudicial - Objeto que contiene los nuevos datos del proceso judicial
 * @returns {object} Retorna el objeto del proceso judicial actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
  async actualizarProcesoJudicial(id, { fecha_inicio, fecha_proceso, fecha_conclusion, area_seguimiento, numero_expediente, id_juzgado }) {
    try {
      const procesoJudicial = await proceso_judicial.update({ fecha_inicio, fecha_proceso, fecha_conclusion, area_seguimiento, numero_expediente, id_juzgado }, { where: { id_proceso_judicial: id } })
      return procesoJudicial
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite eliminar un proceso judicial de la base de datos
 * @param {number} id - ID del proceso judicial a eliminar
 * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
 */
  async eliminarProcesoJudicial(id) {
    try {
      const procesoJudicial = await proceso_judicial.findByPk(id)
      if (!procesoJudicial) {
        throw new Error('No existe el proceso judicial')
      }
      await procesoJudicial.destroy()
      return 'Proceso judicial eliminado con éxito'
    } catch (err) {
      throw err
    }
  }
}

module.exports = new ProcesoJudicialDAO()
