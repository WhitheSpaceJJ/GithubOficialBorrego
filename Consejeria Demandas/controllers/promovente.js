const promoventeDAO = require('../data-access/promoventeDAO')

/**
 * @abstract Método que permite crear un promovente
 * @param {object} promovente - Objeto que contiene los datos del promovente
 * @returns {object} Retorna el objeto del promovente creado si la operación fue exitosa, de lo contrario lanza un error
 */
const crearPromovente = async (req, res) => {
  try {
    const { id_participante, espanol } = req.body
    const promovente = await promoventeDAO.crearPromovente({
      id_participante,
      espanol
    })
    res.json(promovente)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener todos los promoventes
 * @returns {array} Retorna un arreglo de objetos de promoventes si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerPromoventes = async (req, res) => {
  try {
    const promoventes = await promoventeDAO.obtenerPromoventes()
    res.json(promoventes)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener un promovente por su id
 * @param {number} id - ID del promovente a obtener
 * @returns {object} Retorna el objeto del promovente si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerPromovente = async (req, res) => {
  try {
    const { id } = req.params
    const promovente = await promoventeDAO.obtenerPromoventePorParticipante(Number(id))
    res.json(promovente)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite actualizar un promovente
 * @param {object} promovente - Objeto que contiene los datos del promovente
 * @returns {object} Retorna el objeto del promovente actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarPromovente = async (req, res) => {
  try {
    const { id } = req.params
    const { id_participante, espanol } = req.body
    await promoventeDAO.actualizarPromovente(Number(id), {
      espanol
    })
    const actualizado = await promoventeDAO.obtenerPromoventePorParticipante(Number(id))
    res.json(actualizado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite eliminar un promovente
 * @param {number} id - ID del promovente a eliminar
 * @returns {object} Retorna el objeto del promovente eliminado si la operación fue exitosa, de lo contrario lanza un error
 */
const eliminarPromovente = async (req, res) => {
  try {
    const { id } = req.params
    const promovente = await promoventeDAO.eliminarPromovente(Number(id))
    res.json(promovente)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

module.exports = {
  crearPromovente,
  obtenerPromoventes,
  obtenerPromovente,
  actualizarPromovente,
  eliminarPromovente
}
