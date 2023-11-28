const Imputado = require('../models/Imputado')

class ImputadoDAO {
  /**
 * @abstract Método que permite crear un imputado en la base de datos
 * @param {object} imputado - Objeto que contiene los datos del imputado
 * @returns {object} Retorna el objeto del imputado creado si la operación fue exitosa, de lo contrario lanza un error
 */
  async crearImputado({ id_participante, delito }) {
    try {
      const imputado = await Imputado.create({ id_participante, delito })
      return imputado
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener todos los imputados de la base de datos
 * @returns {array} Retorna un arreglo de objetos de imputados si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerImputados() {
    try {
      const imputados = await Imputado.findAll()
      return imputados
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener un imputado de la base de datos por su id
 * @param {number} id - ID del imputado a obtener
 * @returns {object} Retorna el objeto del imputado si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerImputado(id) {
    try {
      const imputado = await Imputado.findByPk(id)
      return imputado
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite actualizar un imputado en la base de datos
 * @param {number} idParticipante - ID del participante a actualizar
 * @param {object} imputado - Objeto que contiene los nuevos datos del imputado
 * @returns {object} Retorna el objeto del imputado actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
  async actualizarImputado(idParticipante, { delito }) {
    try {
      const imputado = await Imputado.update({ delito }, { where: { id_participante: idParticipante } })
      return imputado
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite eliminar un imputado de la base de datos
 * @param {number} id - ID del imputado a eliminar
 * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
 */
  async eliminarImputado(id) {
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
