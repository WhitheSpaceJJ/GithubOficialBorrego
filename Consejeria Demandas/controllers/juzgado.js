const juzgadoDAO = require('../data-access/juzgadoDAO')

/**
 * @abstract Método que permite obtener todos los juzgados
 * @returns {array} Retorna un arreglo de objetos de juzgados si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerJuzgados = async (_, res) => {
  try {
    const juzgados = await juzgadoDAO.obtenerJuzgados()
    if (juzgados.length === 0) {
      return res.status(204).json(juzgados)
    }
    res.json(juzgados)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener un juzgado por su id
 * @param {number} id - ID del juzgado a obtener
 * @returns {object} Retorna el objeto del juzgado si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerJuzgado = async (req, res) => {
  try {
    const { id } = req.params
    const juzgado = await juzgadoDAO.obtenerJuzgado(Number(id))
    res.json(juzgado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite crear un juzgado
 * @param {object} juzgado - Objeto que contiene los datos del juzgado
 * @returns {object} Retorna el objeto del juzgado creado si la operación fue exitosa, de lo contrario lanza un error
 */
const crearJuzgado = async (req, res) => {
  try {
    const { nombre_juzgado } = req.body
    const juzgado = await juzgadoDAO.crearJuzgado({ nombre_juzgado })
    res.json(juzgado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite actualizar un juzgado
 * @param {object} juzgado - Objeto que contiene los datos del juzgado
 * @returns {object} Retorna el objeto del juzgado actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarJuzgado = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre_juzgado } = req.body
    await juzgadoDAO.actualizarJuzgado(Number(id), {
      nombre_juzgado
    })
    const juzgado = await juzgadoDAO.obtenerJuzgado(Number(id))
    res.json(juzgado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite eliminar un juzgado
 * @param {number} id - ID del juzgado a eliminar
 * @returns {object} Retorna el objeto del juzgado eliminado si la operación fue exitosa, de lo contrario lanza un error
 */
const eliminarJuzgado = async (req, res) => {
  try {
    const { id } = req.params
    const juez = await juzgadoDAO.eliminarJuzgado(Number(id))
    res.json(juez)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

module.exports = {
  obtenerJuzgados,
  obtenerJuzgado,
  crearJuzgado,
  actualizarJuzgado,
  eliminarJuzgado
}
