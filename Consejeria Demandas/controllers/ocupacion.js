const ocupacionDAO = require('../data-access/ocupacionDAO')

const obtenerOcupaciones = async (req, res) => {
  try {
    const ocupaciones = await ocupacionDAO.obtenerOcupaciones()
    if(ocupaciones.length === 0){
      return res.status(204).json(ocupaciones)
    }
    res.json(ocupaciones)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const obtenerOcupacion = async (req, res) => {
  try {
    const { id } = req.params
    const ocupacion = await ocupacionDAO.obtenerOcupacion(Number(id))
    res.json(ocupacion)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const crearOcupacion = async (req, res) => {
  try {
    const { descripcion_ocupacion } = req.body

    const ocupacion = await ocupacionDAO.crearOcupacion({ descripcion_ocupacion })

    res.json(ocupacion)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const actualizarOcupacion = async (req, res) => {
  try {
    const { id } = req.params
    const { descripcion_ocupacion } = req.body
    await ocupacionDAO.actualizarOcupacion(Number(id), {
      descripcion_ocupacion
    })
    const ocupacion = await ocupacionDAO.obtenerOcupacion(Number(id))
    res.json(ocupacion)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

const eliminarOcupacion = async (req, res) => {
  try {
    const { id } = req.params
    const ocupacion = await ocupacionDAO.eliminarOcupacion(Number(id))
    res.json(ocupacion)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

module.exports = {
  obtenerOcupaciones,
  crearOcupacion,
  obtenerOcupacion,
  actualizarOcupacion,
  eliminarOcupacion
}
