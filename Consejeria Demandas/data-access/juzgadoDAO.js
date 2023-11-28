const Juzgado = require('../models/juzgado')

class JuzgadoDAO {
  /**
 * @abstract Método que permite crear un juzgado en la base de datos
 * @param {object} juzgado - Objeto que contiene los datos del juzgado
 * @returns {object} Retorna el objeto del juzgado creado si la operación fue exitosa, de lo contrario lanza un error
 */

  async crearJuzgado({ nombre_juzgado }) {
    try {
      const juzgado = await Juzgado.create({ nombre_juzgado })
      return juzgado
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener todos los juzgados de la base de datos
 * @returns {array} Retorna un arreglo de objetos de juzgados si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerJuzgados() {
    try {
      const juzgados = await Juzgado.findAll()
      return juzgados
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener un juzgado de la base de datos por su id
 * @param {number} id - ID del juzgado a obtener
 * @returns {object} Retorna el objeto del juzgado si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerJuzgado(id) {
    try {
      const juzgado = await Juzgado.findByPk(id)
      return juzgado
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite actualizar un juzgado en la base de datos
 * @param {number} id_juzgado - ID del juzgado a actualizar
 * @param {object} juzgado - Objeto que contiene los nuevos datos del juzgado
 * @returns {object} Retorna el objeto del juzgado actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
  async actualizarJuzgado(id_juzgado, { nombre_juzgado }) {
    try {
      const juzgado = await Juzgado.update({ nombre_juzgado }, { where: { id_juzgado } })
      return juzgado
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite eliminar un juzgado de la base de datos
 * @param {number} id - ID del juzgado a eliminar
 * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
 */
  async eliminarJuzgado(id) {
    try {
      const juzgado = await Juzgado.findByPk(id)
      await juzgado.destroy()
      return 'Juzgado eliminado con éxito'
    } catch (err) {
      throw err
    }
  }
}

module.exports = new JuzgadoDAO()
