const escolaridadDAO = require('../data-access/escolaridadDAO')

/**
 * @abstract Método que permite obtener todas las escolaridades
 * @returns {array} Retorna un arreglo de objetos de escolaridades si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerEscolaridades = async (_, res) => {
  try {
    const escolaridades = await escolaridadDAO.obtenerEscolaridades()
    if (escolaridades.length === 0) {
      return res.status(204).json(escolaridades);
    }
    res.json(escolaridades)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener una escolaridad por su id
 * @param {number} id - ID de la escolaridad a obtener
 * @returns {object} Retorna el objeto de la escolaridad si la operación fue exitosa, de lo contrario lanza un error
 */
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

/**
 * @abstract Método que permite crear una escolaridad
 * @param {object} escolaridad - Objeto que contiene los datos de la escolaridad
 * @returns {object} Retorna el objeto de la escolaridad creada si la operación fue exitosa, de lo contrario lanza un error
 */
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

/**
 * @abstract Método que permite actualizar una escolaridad
 * @param {object} escolaridad - Objeto que contiene los datos de la escolaridad
 * @returns {object} Retorna el objeto de la escolaridad actualizada si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarEscolaridad = async (req, res) => {
  try {
    const { id } = req.params
    const { descripcion } = req.body
    await escolaridadDAO.actualizarEscolaridad(Number(id), { descripcion })
    const escolaridad = await escolaridadDAO.obtenerEscolaridadPorId(Number(id))
    res.json(escolaridad)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite eliminar una escolaridad
 * @param {number} id - ID de la escolaridad a eliminar
 * @returns {object} Retorna el objeto de la escolaridad eliminada si la operación fue exitosa, de lo contrario lanza un error
 */
const eliminarEscolaridad = async (req, res) => {
  try {
    const { id } = req.params
    const escolaridad = await escolaridadDAO.eliminarEscolaridad(Number(id))
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
