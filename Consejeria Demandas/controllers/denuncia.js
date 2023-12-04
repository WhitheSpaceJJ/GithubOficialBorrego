const denunciaDAO = require('../data-access/denunciaDAO')

/**
 * @abstract Método que permite obtener todas las denuncias
 * @returns {array} Retorna un arreglo de objetos de denuncias si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerDenuncias = async (_, res) => {
  try {
    const denuncias = await denunciaDAO.obtenerDenuncias()
    if (denuncias.length === 0) {
      return res.status(204).json(denuncias);
    }
    res.json(denuncias)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener una denuncia por su id
 * @param {number} id - ID de la denuncia a obtener
 * @returns {object} Retorna el objeto de la denuncia si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerDenuncia = async (req, res) => {
  try {
    const { id } = req.params
    const denuncia = await denunciaDAO.obtenerDenuncia(Number(id))
    res.json(denuncia)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite crear una denuncia
 * @param {object} denuncia - Objeto que contiene los datos de la denuncia
 * @returns {object} Retorna el objeto de la denuncia creada si la operación fue exitosa, de lo contrario lanza un error
 */
const crearDenuncia = async (req, res) => {
  try {
    const { id_proceso_judicial, causa_penal, delito, modalidad, hechos, plazo_cierre, unidad_mp, estrategia, id_juez } = req.body

    const denuncia = await denunciaDAO.crearDenuncia({ id_proceso_judicial, causa_penal, delito, modalidad, hechos, plazo_cierre, unidad_mp, estrategia, id_juez })

    res.json(denuncia)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite actualizar una denuncia
 * @param {object} denuncia - Objeto que contiene los datos de la denuncia
 * @returns {object} Retorna el objeto de la denuncia actualizada si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarDenuncia = async (req, res) => {
  try {
    const { id } = req.params
    const { id_denuncia, ...data } = req.body
    await denunciaDAO.actualizarDenuncia(Number(id), data)
    const denuncia = await denunciaDAO.obtenerDenuncia(Number(id))
    res.json(denuncia)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite eliminar una denuncia
 * @param {number} id - ID de la denuncia a eliminar
 * @returns {object} Retorna el objeto de la denuncia eliminada si la operación fue exitosa, de lo contrario lanza un error
 */
const eliminarDenuncia = async (req, res) => {
  try {
    const { id } = req.params
    const denuncia = await denunciaDAO.eliminarDenuncia(Number(id))
    res.json(denuncia)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

module.exports = {
  obtenerDenuncias,
  crearDenuncia,
  obtenerDenuncia,
  actualizarDenuncia,
  eliminarDenuncia
}
