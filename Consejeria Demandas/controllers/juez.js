const juezDAO = require('../data-access/juezDAO')

const obtenerJueces = async (_, res) => {
  try {
    const jueces = await juezDAO.obtenerTodosJuez()
    res.json(jueces)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const obtenerJuez = async (req, res) => {
  try {
    const { id } = req.params
    const juez = await juezDAO.obtenerJuezPorId(Number(id))
    res.json(juez)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const crearJuez = async (req, res) => {
  try {
    const { nombre_juez } = req.body
    const juez = await juezDAO.crearJuez({ nombre_juez })
    res.json(juez)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const actualizarJuez = async (req, res) => {
  try {
    const { id } = req.params
    const { id_juez, nombre_juez } = req.body
    await juezDAO.actualizarJuez(Number(id), {
      nombre_juez
    })
    const juez = await juezDAO.obtenerJuezPorId(Number(id))
    res.json(juez)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const eliminarJuez = async (req, res) => {
  try {
    const { id } = req.params
    const juez = juezDAO.borrarJuez(Number(id))
    res.json(juez)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

module.exports = {
  obtenerJueces,
  obtenerJuez,
  crearJuez,
  actualizarJuez,
  eliminarJuez
}
