const Participante = require('../models/participante')

class ParticipanteDAO {
  /**
 * @abstract Método que permite crear un participante en la base de datos
 * @param {object} participante - Objeto que contiene los datos del participante
 * @returns {object} Retorna el objeto del participante creado si la operación fue exitosa, de lo contrario lanza un error
 */
  async crearParticipante({ nombre, edad, id_escolaridad, id_etnia, id_ocupacion, id_persona }) {
    try {
      const participante = await Participante.create({ nombre, edad, id_escolaridad, id_etnia, id_ocupacion, id_persona })
      return participante
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener todos los participantes de la base de datos
 * @returns {array} Retorna un arreglo de objetos de participantes si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerParticipantes() {
    try {
      const participantes = await Participante.findAll()
      return participantes
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener un participante de la base de datos por su id
 * @param {number} id - ID del participante a obtener
 * @returns {object} Retorna el objeto del participante si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerParticipante(id) {
    try {
      const participante = await Participante.findByPk(id)
      return participante
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite actualizar un participante en la base de datos
 * @param {number} id_participante - ID del participante a actualizar
 * @param {object} participante - Objeto que contiene los nuevos datos del participante
 * @returns {object} Retorna el objeto del participante actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
  async actualizarParticipante(id_participante, { nombre, edad, id_escolaridad, id_etnia, id_ocupacion, id_persona }) {
    try {
      const participante = await Participante.update({ nombre, edad, id_escolaridad, id_etnia, id_ocupacion, id_persona }, { where: { id_participante } })
      return participante
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite eliminar un participante de la base de datos
 * @param {number} id - ID del participante a eliminar
 * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
 */
  async eliminarParticipante(id) {
    try {
      const participante = await Participante.findByPk(id)
      await participante.destroy()
      return 'participante eliminado con exito'
    } catch (err) {
      throw err
    }
  }
}

module.exports = new ParticipanteDAO()
