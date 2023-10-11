const estado_procesal = require('../models/estado_procesal')

class EstadoProcesalDAO {
    constructor() { }

    async crearEstadoProcesal({ descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial }) {
        try {
            const result = await estado_procesal.create({ descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial })
            return result
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async actualizarEstadoProcesal(id_estado_procesal, { descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial }) {
        try {
            const estadoProcesal = await estado_procesal.findByPk(id_estado_procesal)
            if (!estadoProcesal) {
                throw new Error('Estado procesal no encontrado')
            }
            const result = await estadoProcesal.update({ descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial }, { where: { id_estado_procesal } })
            return result
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async eliminarEstadoProcesal({ id_estado_procesal }) {
        try {
            const deleteEstadoProcesal = await estado_procesal.findByPk({ id_estado_procesal })
            if (!deleteEstadoProcesal) {
                throw new Error('Estado procesal no encontrado')
            }
            return await deleteEstadoProcesal.destroy()
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async obtenerEstadoProcesalID({ id_estado_procesal }) {
        try {
            const estadoProcesal = await estado_procesal.findByPk(id_estado_procesal)
            if (!estadoProcesal) {
                throw new Error('Estado procesal no encontrado')
            }
            return estadoProcesal
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async obtenerEstadosProcesales() {
        try {
            return await estado_procesal.findAll()
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

module.exports = new EstadoProcesalDAO();