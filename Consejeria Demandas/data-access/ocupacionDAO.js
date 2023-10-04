const { Ocupacion } = require('../models');

class OcupacionDAO {
  constructor() {}

  async crearOcupacion({ descripcion_ocupacion }) {
    try {
      const ocupacion = await Ocupacion.create({ descripcion_ocupacion });
      return ocupacion;
    } catch (err) {
      throw err;
    }
  }

  async obtenerOcupaciones() {
    try {
      const ocupaciones = await Ocupacion.findAll();
      return ocupaciones;
    } catch (err) {
      throw err;
    }
  }

  async obtenerOcupacionPorId(id) {
    try {
      const ocupacion = await Ocupacion.findByPk(id);
      return ocupacion;
    } catch (err) {
      throw err;
    }
  }

  async actualizarOcupacion(id, { descripcion_ocupacion }) {
    try {
      const ocupacion = await Ocupacion.update({ descripcion_ocupacion }, { where: { id } });
      return ocupacion;
    } catch (err) {
      throw err;
    }
  }

  async eliminarOcupacion(id) {
    try {
      const ocupacion = await Ocupacion.findByPk(id);
      if (!ocupacion) {
        throw new Error('No existe la ocupación');
      }
      await ocupacion.destroy();
      return 'Ocupación eliminada con éxito';
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new OcupacionDAO();