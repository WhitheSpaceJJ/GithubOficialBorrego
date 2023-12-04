const ocupacionDAO = require('../data-access/ocupacionDAO')

/**
 * @abstract Método que permite obtener todas las ocupaciones
 * @returns {array} Retorna un arreglo de objetos de ocupaciones si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerOcupaciones = async (req, res) => {
  try {
    const ocupaciones = await ocupacionDAO.obtenerOcupaciones()
    if (ocupaciones.length === 0) {
      return res.status(204).json(ocupaciones)
    }
    res.json(ocupaciones)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener una ocupación por su id
 * @param {number} id - ID de la ocupación a obtener
 * @returns {object} Retorna el objeto de la ocupación si la operación fue exitosa, de lo contrario lanza un error
 */
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

/**
 * @abstract Método que permite crear una ocupación
 * @param {object} ocupacion - Objeto que contiene los datos de la ocupación
 * @returns {object} Retorna el objeto de la ocupación creada si la operación fue exitosa, de lo contrario lanza un error
 */
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

/**
 * @abstract Método que permite actualizar una ocupación
 * @param {object} ocupacion - Objeto que contiene los datos de la ocupación
 * @returns {object} Retorna el objeto de la ocupación actualizada si la operación fue exitosa, de lo contrario lanza un error
 */
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

/**
 * @abstract Método que permite eliminar una ocupación
 * @param {number} id - ID de la ocupación a eliminar
 * @returns {object} Retorna el objeto de la ocupación eliminada si la operación fue exitosa, de lo contrario lanza un error
 */
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
