const Promovente = require('../models/promovente');

class PromoventeDAO {
  constructor() {}

  async crearPromovente({ id_participante, espanol }) {
    try {
      const promovente = await Promovente.create({ id_participante, espanol });
      return promovente;
    } catch (err) {
      throw err;
    }
  }

  async obtenerPromoventes() {
    try {
      const promoventes = await Promovente.findAll();
      return promoventes;
    } catch (err) {
      throw err;
    }
  }

  async obtenerPromoventePorId(id) {
    try {
      const promovente = await Promovente.findByPk(id);
      return promovente;
    } catch (err) {
      throw err;
    }
  }

  async actualizarPromovente(id, { id_participante, espanol }) {
    try {
      const promovente = await Promovente.update({ id_participante, espanol }, { where: { id_participante: id } });
      return promovente;
    } catch (err) {
      throw err;
    }
  }

  async eliminarPromovente(id) {
    try {
      const promovente = await Promovente.findByPk(id);
      if (!promovente) {
        throw new Error('No existe el promovente');
      }
      await promovente.destroy();
      return 'Promovente eliminado con éxito';
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new PromoventeDAO();