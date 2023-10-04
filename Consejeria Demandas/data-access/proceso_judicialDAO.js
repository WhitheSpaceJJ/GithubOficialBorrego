const { proceso_judicial } = require('../models');

class ProcesoJudicialDAO {
  constructor() {}

  async crearProcesoJudicial({ fecha_inicio, fecha_proceso, fecha_conclusion, area_seguimiento, numero_expediente, DTYPE, id_juzgado }) {
    try {
      const procesoJudicial = await proceso_judicial.create({ fecha_inicio, fecha_proceso, fecha_conclusion, area_seguimiento, numero_expediente, DTYPE, id_juzgado });
      return procesoJudicial;
    } catch (err) {
      throw err;
    }
  }

  async obtenerProcesosJudiciales() {
    try {
      const procesosJudiciales = await proceso_judicial.findAll();
      return procesosJudiciales;
    } catch (err) {
      throw err;
    }
  }

  async obtenerProcesoJudicialPorId(id) {
    try {
      const procesoJudicial = await proceso_judicial.findByPk(id);
      return procesoJudicial;
    } catch (err) {
      throw err;
    }
  }

  async actualizarProcesoJudicial(id, { fecha_inicio, fecha_proceso, fecha_conclusion, area_seguimiento, numero_expediente, DTYPE, id_juzgado }) {
    try {
      const procesoJudicial = await proceso_judicial.update({ fecha_inicio, fecha_proceso, fecha_conclusion, area_seguimiento, numero_expediente, DTYPE, id_juzgado }, { where: { id_proceso_judicial: id } });
      return procesoJudicial;
    } catch (err) {
      throw err;
    }
  }

  async eliminarProcesoJudicial(id) {
    try {
      const procesoJudicial = await proceso_judicial.findByPk(id);
      if (!procesoJudicial) {
        throw new Error('No existe el proceso judicial');
      }
      await procesoJudicial.destroy();
      return 'Proceso judicial eliminado con éxito';
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new ProcesoJudicialDAO();