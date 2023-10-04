const { Demanda } = require('../models/demanda')

export class DemandaDAO {
    constructor() { }

    async crearDemanda({ id_proceso_judicial, tipo_demanda, descripcion_demanda, fecha_demanda }) {
        try {
            const result = await Demanda.create({ id_proceso_judicial, tipo_demanda, descripcion_demanda, fecha_demanda })
            return result
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async actualizarDemanda(id_demanda, { id_proceso_judicial, tipo_demanda, descripcion_demanda, fecha_demanda }) {
        try {
            const demanda = await Demanda.findByPk(id_demanda)
            if (!demanda) {
                throw new Error('Demanda no encontrada')
            }
            const result = await demanda.update({ id_proceso_judicial, tipo_demanda, descripcion_demanda, fecha_demanda }, { where: { id_demanda } })
            return result
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async eliminarDemanda({ id_demanda }) {
        try {
            const deleteDemanda = await Demanda.findByPk({ id_demanda })
            if (!deleteDemanda) {
                throw new Error('Demanda no encontrada')
            }
            return await deleteDemanda.destroy()
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async obtenerDemandaID({ id_demanda }) {
        try {
            const demanda = await Demanda.findByPk(id_demanda)
            if (!demanda) {
                throw new Error('Demanda no encontrada')
            }
            return demanda
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async obtenerDemandas() {
        try {
            return await Demanda.findAll()
        } catch (error) {
            console.log(error)
            throw error
        }
    }


}