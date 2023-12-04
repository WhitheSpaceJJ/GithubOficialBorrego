const etniaDAO = require('../data-access/etniaDAO')

/**
 * @abstract Método que permite obtener todas las etnias
 * @returns {array} Retorna un arreglo de objetos de etnias si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerEtnias = async (req, res) => {
  try {
    const etnias = await etniaDAO.obtenerEtnias()
    if (etnias.length === 0) {
      return res.status(204).json(etnias)
    }
    res.json(etnias)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener una etnia por su id
 * @param {number} id - ID de la etnia a obtener
 * @returns {object} Retorna el objeto de la etnia si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerEtnia = async (req, res) => {
  try {
    const { id } = req.params
    const etnia = await etniaDAO.obtenerEtnia(Number(id))
    res.json(etnia)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite crear una etnia
 * @param {object} etnia - Objeto que contiene los datos de la etnia
 * @returns {object} Retorna el objeto de la etnia creada si la operación fue exitosa, de lo contrario lanza un error
 */
const crearEtnia = async (req, res) => {
  try {
    const { nombre } = req.body
    const etnia = await etniaDAO.crearEtnia({ nombre })
    res.json(etnia)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite actualizar una etnia
 * @param {object} etnia - Objeto que contiene los datos de la etnia
 * @returns {object} Retorna el objeto de la etnia actualizada si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarEtnia = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre } = req.body
    await etniaDAO.actualizarEtnia(Number(id), {
      nombre
    })
    const actualizado = await etniaDAO.obtenerEtnia(Number(id))
    res.json(actualizado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite eliminar una etnia
 * @param {number} id - ID de la etnia a eliminar
 * @returns {object} Retorna el objeto de la etnia eliminada si la operación fue exitosa, de lo contrario lanza un error
 */
const eliminarEtnia = async (req, res) => {
  try {
    const { id } = req.params
    const etnia = await etniaDAO.eliminarEtnia(Number(id))
    res.json(etnia)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

module.exports = {
  obtenerEtnias,
  obtenerEtnia,
  crearEtnia,
  actualizarEtnia,
  eliminarEtnia
}
