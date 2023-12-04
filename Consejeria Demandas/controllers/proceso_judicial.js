const procesoJudicialDAO = require('../data-access/proceso_judicialDAO')

/**
 * @abstract Método que permite crear un proceso judicial
 * @param {object} procesoJudicial - Objeto que contiene los datos del proceso judicial
 * @returns {object} Retorna el objeto del proceso judicial creado si la operación fue exitosa, de lo contrario lanza un error
 */
const crearProcesoJudicial = async (req, res) => {
  try {
    const { fecha_inicio, fecha_proceso, fecha_conclusion, area_seguimiento, numero_expediente, id_juzgado } = req.body
    const procesoJudicial = await procesoJudicialDAO.crearProcesoJudicial({
      fecha_inicio,
      fecha_proceso,
      fecha_conclusion,
      area_seguimiento,
      numero_expediente,
      id_juzgado
    })
    res.json(procesoJudicial)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener todos los procesos judiciales
 * @returns {array} Retorna un arreglo de objetos de procesos judiciales si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerProcesosJudiciales = async (req, res) => {
  try {
    const procesosJudiciales = await procesoJudicialDAO.obtenerProcesosJudiciales()
    if (procesosJudiciales.length === 0) {
      return res.status(204).json(procesosJudiciales)
    }
    res.json(procesosJudiciales)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener un proceso judicial por su id
 * @param {number} id - ID del proceso judicial a obtener
 * @returns {object} Retorna el objeto del proceso judicial si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerProcesoJudicial = async (req, res) => {
  try {
    const { id } = req.params
    const procesoJudicial = await procesoJudicialDAO.obtenerProcesoJudicial(Number(id))
    res.json(procesoJudicial)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite actualizar un proceso judicial
 * @param {object} procesoJudicial - Objeto que contiene los datos del proceso judicial
 * @returns {object} Retorna el objeto del proceso judicial actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarProcesoJudicial = async (req, res) => {
  try {
    const { id } = req.params
    const { id_proceso_judicial, ...data } = req.body
    await procesoJudicialDAO.actualizarProcesoJudicial(Number(id), data)
    const actualizado = await procesoJudicialDAO.obtenerProcesoJudicial(Number(id))
    res.json(actualizado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite eliminar un proceso judicial
 * @param {number} id - ID del proceso judicial a eliminar
 * @returns {object} Retorna el objeto del proceso judicial eliminado si la operación fue exitosa, de lo contrario lanza un error
 */
const eliminarProcesoJudicial = async (req, res) => {
  try {
    const { id } = req.params
    const procesoJudicial = await procesoJudicialDAO.eliminarProcesoJudicial(Number(id))
    res.json(procesoJudicial)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

module.exports = {
  crearProcesoJudicial,
  obtenerProcesosJudiciales,
  obtenerProcesoJudicial,
  actualizarProcesoJudicial,
  eliminarProcesoJudicial
}
