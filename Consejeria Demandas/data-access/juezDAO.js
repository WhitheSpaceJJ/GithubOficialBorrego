const Juez = require('../models/juez')

class JuezDAO {

  /**
 * @abstract Método que permite crear un juez en la base de datos
 * @param {object} juez - Objeto que contiene los datos del juez
 * @returns {object} Retorna el objeto del juez creado si la operación fue exitosa, de lo contrario lanza un error
 */
  async crearJuez({ nombre_juez }) {
    try {
      const juez = await Juez.create({ nombre_juez })
      return juez
    } catch (e) {
      throw e
    }
  }

  /**
 * @abstract Método que permite obtener todos los jueces de la base de datos
 * @returns {array} Retorna un arreglo de objetos de jueces si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerJueces() {
    try {
      const juez = await Juez.findAll()
      return juez
    } catch (e) {
      throw e
    }
  }

  /**
 * @abstract Método que permite obtener un juez de la base de datos por su id
 * @param {number} id - ID del juez a obtener
 * @returns {object} Retorna el objeto del juez si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerJuez(id) {
    try {
      const juez = await Juez.findByPk(id)
      return juez
    } catch (e) {
      throw e
    }
  }

  /**
 * @abstract Método que permite actualizar un juez en la base de datos
 * @param {number} id_juez - ID del juez a actualizar
 * @param {object} juez - Objeto que contiene los nuevos datos del juez
 * @returns {object} Retorna el objeto del juez actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
  async actualizarJuez(id_juez, { nombre_juez }) {
    try {
      const juez = await Juez.update({ nombre_juez }, { where: { id_juez } })
      return juez
    } catch (e) {
      throw e
    }
  }

  /**
 * @abstract Método que permite eliminar un juez de la base de datos
 * @param {number} id_juez - ID del juez a eliminar
 * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
 */
  async eliminarJuez(id_juez) {
    try {
      await Juez.destroy({ where: { id_juez } })
      return 'Juez eliminado con éxito'
    } catch (e) {
      throw e
    }
  }
}

module.exports = new JuezDAO()
