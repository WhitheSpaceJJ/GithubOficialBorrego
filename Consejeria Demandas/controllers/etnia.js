const etniaDAO = require('../data-access/etniaDAO');

const obtenerEtnias = async (req, res) => {
    try {
        const etnias = await etniaDAO.obtenerEtnias()
        res.json(etnias)
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd'
        })
    }
}

const obtenerEtnia = async (req, res) => {
    try {
        const { id } = req.params
        const etnia = await etniaDAO.obtenerEtniaPorId(Number(id))
        res.json(etnia)
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd'
        })
    }
}

const crearEtnia = async (req, res) => {
    try {
        const { nombre } = req.body
        const etnia = await etniaDAO.crearEtnia(nombre)
        res.json(etnia)
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd'
        })
    }
}

const actualizarEtnia = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre } = req.body
        await etniaDAO.actualizarEtnia(Number(id), {
            nombre
        })
        const actualizado = await etniaDAO.obtenerEtniaPorId(Number(id))
        res.json(actualizado)
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd'
        })
    }
}

const eliminarEtnia = async (req, res) => {
    try {
        const { id } = req.params
        const etnia = await etniaDAO.eliminarEtnia(Number(id))
        res.json(etnia)
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd'
        })
    }
}

module.exports = {
    obtenerEtnias,
    obtenerEtnia,
    crearEtnia,
    actualizarEtnia,
    eliminarEtnia
}