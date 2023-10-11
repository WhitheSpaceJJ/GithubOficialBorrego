const imputadoDAO = require('../data-access/imputadoDAO');

const obtenerImputados = async (req, res) => {
    try {
        const imputados = await imputadoDAO.obtenerImputados()
        res.json(imputados)
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd'
        })
    }
}

const obtenerImputado = async (req, res) => {
    try {
        const { id } = req.params
        const imputado = await imputadoDAO.obtenerImputadoPorId(Number(id))
        res.json(imputado)
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd'
        })
    }
}

const crearImputado = async (req, res) => {
    try {
        const { id_participante, delito } = req.body
        const imputado = await imputadoDAO.crearImputado(id_participante, delito)
        res.json(imputado)
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd'
        })
    }
}

const actualizarImputado = async (req, res) => {
    try {
        const { id } = req.params
        const { id_participante, delito } = req.body
        await imputadoDAO.actualizarImputado(Number(id), {
            id_participante,
            delito
        })
        const actualizado = await imputadoDAO.obtenerImputadoPorId(Number(id))
        res.json(actualizado)
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd'
        })
    }
}

const eliminarImputado = async (req, res) => {
    try {
        const { id } = req.params
        const imputado = await imputadoDAO.eliminarImputado(Number(id))
        res.json(imputado)
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd'
        })
    }
}

module.exports = {
    obtenerImputados,
    obtenerImputado,
    crearImputado,
    actualizarImputado,
    eliminarImputado
}