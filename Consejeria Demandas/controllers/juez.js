const juezDAO = require('../data-access/juezDAO')

/**
 * @abstract Método que permite obtener todos los jueces
 * @returns {array} Retorna un arreglo de objetos de jueces si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerJueces = async (_, res) => {
  try {
    const jueces = await juezDAO.obtenerJueces()
    if (jueces.length === 0) {
      return res.status(204).json(jueces)
    }
    res.json(jueces)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener un juez por su id
 * @param {number} id - ID del juez a obtener
 * @returns {object} Retorna el objeto del juez si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerJuez = async (req, res) => {
  try {
    const { id } = req.params
    const juez = await juezDAO.obtenerJuez(Number(id))
    res.json(juez)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite crear un juez
 * @param {object} juez - Objeto que contiene los datos del juez
 * @returns {object} Retorna el objeto del juez creado si la operación fue exitosa, de lo contrario lanza un error
 */
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

/**
 * @abstract Método que permite actualizar un juez
 * @param {object} juez - Objeto que contiene los datos del juez
 * @returns {object} Retorna el objeto del juez actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarJuez = async (req, res) => {
  try {
    const { id } = req.params
    const { id_juez, nombre_juez } = req.body
    await juezDAO.actualizarJuez(Number(id), {
      nombre_juez
    })
    const juez = await juezDAO.obtenerJuez(Number(id))
    res.json({ message: 'Juez actualizado exitosamente', juez })
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd',
      error: error.message
    })
  }
}

/**
 * @abstract Método que permite eliminar un juez
 * @param {number} id - ID del juez a eliminar
 * @returns {object} Retorna el objeto del juez eliminado si la operación fue exitosa, de lo contrario lanza un error
 */
const eliminarJuez = async (req, res) => {
  try {
    const { id } = req.params
    const juez = await juezDAO.eliminarJuez(Number(id))
    if (!juez) {
      return res.status(404).json({
        error: {
          message: 'No se encontró el juez con el ID proporcionado',
          id: id
        }
      })
    }
    res.json({ message: 'Juez eliminado exitosamente', juez })
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Hubo un error al eliminar el juez',
        details: error.message
      }
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
