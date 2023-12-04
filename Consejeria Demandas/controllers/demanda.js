const demandaDAO = require('../data-access/demandaDAO')

/**
 * @abstract Método que permite obtener todas las demandas
 * @returns {array} Retorna un arreglo de objetos de demandas si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerDemandas = async (_, res) => {
  try {
    const demandas = await demandaDAO.obtenerDemandas()
    if (demandas.length === 0) {
      return res.status(204).json(demandas)
    }
    res.json(demandas)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener una demanda por su id
 * @param {number} id - ID de la demanda a obtener
 * @returns {object} Retorna el objeto de la demanda si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerDemanda = async (req, res) => {
  try {
    const { id } = req.params
    const demanda = await demandaDAO.obtenerDemanda(Number(id))
    res.json(demanda)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite crear una demanda
 * @param {object} demanda - Objeto que contiene los datos de la demanda
 * @returns {object} Retorna el objeto de la demanda creada si la operación fue exitosa, de lo contrario lanza un error
 */
const crearDemanda = async (req, res) => {
  try {
    const { id_proceso_judicial, tipo_demanda, descripcion_demanda, fecha_demanda } = req.body

    const demanda = await demandaDAO.crearDemanda({ id_proceso_judicial, tipo_demanda, descripcion_demanda, fecha_demanda })

    res.json(demanda)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite actualizar una demanda
 * @param {object} demanda - Objeto que contiene los datos de la demanda
 * @returns {object} Retorna el objeto de la demanda actualizada si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarDemanda = async (req, res) => {
  try {
    const { id } = req.params
    const { id_demanda, ...data } = req.body
    await demandaDAO.actualizarDemanda(Number(id), data)
    const demanda = await demandaDAO.obtenerDemanda(Number(id))
    res.json(demanda)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite actualizar una demanda
 * @param {Number} id - id de al demada a eliminar
 * @returns {object} Retorna el objeto de la demanda eliminada si la operación fue exitosa, de lo contrario lanza un error
 */
const eliminarDemanda = async (req, res) => {
  try {
    const { id } = req.params
    const demanda = await demandaDAO.eliminarDemanda(Number(id))
    res.json(demanda)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

module.exports = {
  obtenerDemandas,
  crearDemanda,
  obtenerDemanda,
  actualizarDemanda,
  eliminarDemanda
}
