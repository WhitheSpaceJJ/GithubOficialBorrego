const Promovente = require('../models/promovente')

class PromoventeDAO {
  /**
 * @abstract Método que permite crear un promovente en la base de datos
 * @param {object} promovente - Objeto que contiene los datos del promovente
 * @returns {object} Retorna el objeto del promovente creado si la operación fue exitosa, de lo contrario lanza un error
 */
  async crearPromovente({ id_participante, espanol }) {
    try {
      const promovente = await Promovente.create({ id_participante, espanol })
      return promovente
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener todos los promoventes de la base de datos
 * @returns {array} Retorna un arreglo de objetos de promoventes si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerPromoventes() {
    try {
      const promoventes = await Promovente.findAll()
      return promoventes
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener un promovente de la base de datos por su id
 * @param {number} id - ID del promovente a obtener
 * @returns {object} Retorna el objeto del promovente si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerPromovente(id) {
    try {
      const promovente = await Promovente.findByPk(id)
      return promovente
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener un promovente de la base de datos por el id del participante
 * @param {number} idParticipante - ID del participante a obtener
 * @returns {object} Retorna el objeto del promovente si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerPromoventePorParticipante(idParticipante) {
    try {
      const promovente = await Promovente.findOne({ where: { id_participante: idParticipante } })
      return promovente
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite actualizar un promovente en la base de datos
 * @param {number} idParticipante - ID del participante a actualizar
 * @param {object} promovente - Objeto que contiene los nuevos datos del promovente
 * @returns {object} Retorna el objeto del promovente actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
  async actualizarPromovente(idParticipante, { id_participante, espanol }) {
    try {
      const promovente = await Promovente.findOne({ where: { id_participante: idParticipante } })
      const promoventeActualizado = await promovente.update({ id_participante, espanol })
      return promoventeActualizado
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite eliminar un promovente de la base de datos
 * @param {number} idParticipante - ID del participante a eliminar
 * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
 */
  async eliminarPromovente(idParticipante) {
    try {
      const promovente = await Promovente.findOne({ where: { id_participante: idParticipante } })
      await promovente.destroy()
      return 'Promovente eliminado con éxito'
    } catch (err) {
      throw err
    }
  }
}

module.exports = new PromoventeDAO()
