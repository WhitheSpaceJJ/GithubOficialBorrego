const estado_procesalDAO = require('../data-access/estado_procesalDAO')

const obtenerEstadosProcesales = async (req, res) => {
  try {
    const estados_procesales = await estado_procesalDAO.obtenerEstadosProcesales()
    res.json(estados_procesales)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

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
