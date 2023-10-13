const demandaDAO = require('../data-access/demandaDAO')

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
