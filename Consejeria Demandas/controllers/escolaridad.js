const escolaridadDAO = require('../data-access/escolaridadDAO')

const obtenerEscolaridades = async (_, res) => {
  try {
    const escolaridades = await escolaridadDAO.obtenerEscolaridades()
    res.json(escolaridades)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const obtenerEscolaridad = async (req, res) => {
  try {
    const { id } = req.params
    const escolaridad = await escolaridadDAO.obtenerEscolaridadPorId(Number(id))
    res.json(escolaridad)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const crearEscolaridad = async (req, res) => {
  try {
    const { descripcion } = req.body

    const escolaridad = await escolaridadDAO.crearEscolaridad({ descripcion })

    res.json(escolaridad)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const actualizarEscolaridad= async (req, res) => {
  try {
    const { id } = req.params
    const { descripcion } = req.body
    await escolaridadDAO.actualizarEscolaridad(Number(id), descripcion)
    const escolaridad = await escolaridadDAO.obtenerEscolaridadPorId(Number(id))
    res.json(escolaridad)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const eliminarEscolaridad = async (req, res) => {
  try {
    const { id } = req.params
    const escolaridad = escolaridadDAO.eliminarEscolaridad(Number(id))
    res.json(escolaridad)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

module.exports = {
  obtenerEscolaridades,
  crearEscolaridad,
  obtenerEscolaridad,
  actualizarEscolaridad,
  eliminarEscolaridad
}
