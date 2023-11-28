const Ocupacion = require('../models/ocupacion')

class OcupacionDAO {

  /**
 * @abstract Método que permite crear una ocupación en la base de datos
 * @param {object} ocupacion - Objeto que contiene los datos de la ocupación
 * @returns {object} Retorna el objeto de la ocupación creada si la operación fue exitosa, de lo contrario lanza un error
 */
  async crearOcupacion({ descripcion_ocupacion }) {
    try {
      const ocupacion = await Ocupacion.create({ descripcion_ocupacion })
      return ocupacion
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener todas las ocupaciones de la base de datos
 * @returns {array} Retorna un arreglo de objetos de ocupaciones si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerOcupaciones() {
    try {
      const ocupaciones = await Ocupacion.findAll()
      return ocupaciones
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener una ocupación de la base de datos por su id
 * @param {number} id - ID de la ocupación a obtener
 * @returns {object} Retorna el objeto de la ocupación si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerOcupacion(id) {
    try {
      const ocupacion = await Ocupacion.findByPk(id)
      return ocupacion
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite actualizar una ocupación en la base de datos
 * @param {number} id_ocupacion - ID de la ocupación a actualizar
 * @param {object} ocupacion - Objeto que contiene los nuevos datos de la ocupación
 * @returns {object} Retorna el objeto de la ocupación actualizada si la operación fue exitosa, de lo contrario lanza un error
 */
  async actualizarOcupacion(id_ocupacion, { descripcion_ocupacion }) {
    try {
      const ocupacion = await Ocupacion.update({ descripcion_ocupacion }, { where: { id_ocupacion } })
      return ocupacion
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite eliminar una ocupación de la base de datos
 * @param {number} id - ID de la ocupación a eliminar
 * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
 */
  async eliminarOcupacion(id) {
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
