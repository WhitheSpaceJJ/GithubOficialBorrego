const juzgadoDAO = require('../data-access/juzgadoDAO')

const obtenerJuzgados = async (_, res) => {
  try {
    const juzgados = await juzgadoDAO.obtenerJuzgados()
    res.json(juzgados)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const obtenerJuzgado = async (req, res) => {
  try {
    const { id } = req.params
    const juzgado = await juzgadoDAO.obtenerJuzgadoPorId(Number(id))
    res.json(juzgado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const crearJuzgado = async (req, res) => {
  try {
    const { nombre_juzgado } = req.body
    const juzgado = await juzgadoDAO.crearJuez({ nombre_juzgado })
    res.json(juzgado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const actualizarJuzgado = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre_juzgado } = req.body
    await juzgadoDAO.actualizarJuzgado(Number(id), {
      nombre_juzgado
    })
    const juzgado = juzgadoDAO.obtenerJuzgadoPorId(Number(id))
    res.json(juzgado)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const eliminarJuzgado = async (req, res) => {
  try {
    const { id } = req.params
    const juez = juzgadoDAO.eliminarJuzgado(Number(id))
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
