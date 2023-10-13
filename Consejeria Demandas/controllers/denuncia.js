const denunciaDAO = require('../data-access/denunciaDAO')

const obtenerDenuncias = async (_, res) => {
  try {
    const denuncias = await denunciaDAO.obtenerDenuncias()
    res.json(denuncias)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

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
