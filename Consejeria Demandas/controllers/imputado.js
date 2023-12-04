const imputadoDAO = require('../data-access/imputadoDAO')

/**
 * @abstract Método que permite obtener todos los imputados
 * @returns {array} Retorna un arreglo de objetos de imputados si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerImputados = async (req, res) => {
  try {
    const imputados = await imputadoDAO.obtenerImputados()
    if (imputados.length === 0) {
      return res.status(204).json(imputados)
    }
    res.json(imputados)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener un imputado por su id
 * @param {number} id - ID del imputado a obtener
 * @returns {object} Retorna el objeto del imputado si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerImputado = async (req, res) => {
  try {
    const { id } = req.params
    const imputado = await imputadoDAO.obtenerImputado(Number(id))
    res.json(imputado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite crear un imputado
 * @param {object} imputado - Objeto que contiene los datos del imputado
 * @returns {object} Retorna el objeto del imputado creado si la operación fue exitosa, de lo contrario lanza un error
 */
const crearImputado = async (req, res) => {
  try {
    const { id_participante, delito } = req.body
    const imputado = await imputadoDAO.crearImputado({ id_participante, delito })
    res.json(imputado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite actualizar un imputado
 * @param {object} imputado - Objeto que contiene los datos del imputado
 * @returns {object} Retorna el objeto del imputado actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarImputado = async (req, res) => {
  try {
    const { id } = req.params
    const { id_imputado, ...data } = req.body
    await imputadoDAO.actualizarImputado(Number(id), data)
    const actualizado = await imputadoDAO.obtenerImputado(Number(id))
    res.json(actualizado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite eliminar un imputado
 * @param {number} id - ID del imputado a eliminar
 * @returns {object} Retorna el objeto del imputado eliminado si la operación fue exitosa, de lo contrario lanza un error
 */
const eliminarImputado = async (req, res) => {
  try {
    const { id } = req.params
    const imputado = await imputadoDAO.eliminarImputado(Number(id))
    res.json(imputado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

module.exports = {
  obtenerImputados,
  obtenerImputado,
  crearImputado,
  actualizarImputado,
  eliminarImputado
}
