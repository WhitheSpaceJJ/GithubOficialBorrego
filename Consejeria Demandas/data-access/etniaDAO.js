const Etnia = require('../models/etnia')

class EtniaDAO {

  /**
   * @abstract Método que permite crear una etnia en la base de datos
   * @param {object} etnia - Objeto que contiene los datos de la etnia
   * @returns {object} Retorna el objeto de la etnia creada si la operación fue exitosa, de lo contrario lanza un error
   */
  async crearEtnia({ nombre }) {
    try {
      const etnia = await Etnia.create({ nombre })
      return etnia
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite obtener todas las etnias de la base de datos
   * @returns {array} Retorna un arreglo de objetos de etnias si la operación fue exitosa, de lo contrario lanza un error
   */
  async obtenerEtnias() {
    try {
      const etnias = await Etnia.findAll()
      return etnias
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite obtener una etnia de la base de datos por su id
   * @param {number} id - ID de la etnia a obtener
   * @returns {object} Retorna el objeto de la etnia si la operación fue exitosa, de lo contrario lanza un error
   */
  async obtenerEtnia(id) {
    try {
      const etnia = await Etnia.findByPk(id)
      return etnia
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite actualizar una etnia en la base de datos
   * @param {number} id_etnia - ID de la etnia a actualizar
   * @param {object} etnia - Objeto que contiene los nuevos datos de la etnia
   * @returns {object} Retorna el objeto de la etnia actualizada si la operación fue exitosa, de lo contrario lanza un error
   */
  async actualizarEtnia(id_etnia, { nombre }) {
    try {
      const etnia = await Etnia.update({ nombre }, { where: { id_etnia } })
      return etnia
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite eliminar una etnia de la base de datos
   * @param {number} id - ID de la etnia a eliminar
   * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
   */
  async eliminarEtnia(id) {
    try {
      const etnia = await Etnia.findByPk(id)
      await etnia.destroy()
      return 'Etnia eliminada con éxito'
    } catch (err) {
      throw err
    }
  }
}

module.exports = new EtniaDAO()
