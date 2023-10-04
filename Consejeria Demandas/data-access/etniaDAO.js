const Etnia = require('../schemas/etniaSchema');

class EtniaDAO {
    constructor() { }

    async crearEtnia({ nombre }) {
        try {
            const etnia = await Etnia.create({ nombre });
            return etnia;
        } catch (err) {
            throw err;
        }
    }

    async obtenerEtnias() {
        try {
            const etnias = await Etnia.findAll();
            return etnias;
        } catch (err) {
            throw err;
        }
    }

    async obtenerEtniaPorId(id) {
        try {
            const etnia = await Etnia.findByPk(id);
            return etnia;
        } catch (err) {
            throw err;
        }
    }

    async actualizarEtnia(id, { nombre }) {
        try {
            const etnia = await Etnia.update({ nombre }, { where: { id } });
            return etnia;
        } catch (err) {
            throw err;
        }
    }

    async eliminarEtnia(id) {
        try {
            const etnia = await Etnia.findByPk(id)
            if (!etnia) {
                throw new Error('No existe la etnia');
            }
            await etnia.destroy();
            return 'etnia eliminada con exito';
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new EtniaDAO();