const estado_procesalDAO = require('../data-access/estado_procesalDAO')

/**
 * @abstract Método que permite obtener todos los estados procesales
 * @returns {array} Retorna un arreglo de objetos de estados procesales si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerEstadosProcesales = async (req, res) => {
  try {
    const estados_procesales = await estado_procesalDAO.obtenerEstadosProcesales()
    if (estados_procesales.length === 0) {
      return res.status(204).json(estados_procesales)
    }
    res.json(estados_procesales)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener un estado procesal por su id
 * @param {number} id - ID del estado procesal a obtener
 * @returns {object} Retorna el objeto del estado procesal si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerEstadoProcesal = async (req, res) => {
  try {
    const { id } = req.params
    const estado_procesal = await estado_procesalDAO.obtenerEstadoProcesal(Number(id))
    res.json(estado_procesal)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite crear un estado procesal
 * @param {object} estado_procesal - Objeto que contiene los datos del estado procesal
 * @returns {object} Retorna el objeto del estado procesal creado si la operación fue exitosa, de lo contrario lanza un error
 */
const crearEstadoProcesal = async (req, res) => {
  try {
    const { descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial } = req.body
    const estado_procesal = await estado_procesalDAO.crearEstadoProcesal({ descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial })
    res.json(estado_procesal)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite actualizar un estado procesal
 * @param {object} estado_procesal - Objeto que contiene los datos del estado procesal
 * @returns {object} Retorna el objeto del estado procesal actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarEstadoProcesal = async (req, res) => {
  try {
    const { id } = req.params
    const { id_estado_procesal, ...data } = req.body
    await estado_procesalDAO.actualizarEstadoProcesal(Number(id), data)
    const actualizado = await estado_procesalDAO.obtenerEstadoProcesal(Number(id))
    res.json(actualizado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite eliminar un estado procesal
 * @param {number} id - ID del estado procesal a eliminar
 * @returns {object} Retorna el objeto del estado procesal eliminado si la operación fue exitosa, de lo contrario lanza un error
 */
const eliminarEstadoProcesal = async (req, res) => {
  try {
    const { id } = req.params
    const estado_procesal = await estado_procesalDAO.eliminarEstadoProcesal(Number(id))
    res.json(estado_procesal)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

module.exports = {
  obtenerEstadosProcesales,
  obtenerEstadoProcesal,
  crearEstadoProcesal,
  actualizarEstadoProcesal,
  eliminarEstadoProcesal
}
