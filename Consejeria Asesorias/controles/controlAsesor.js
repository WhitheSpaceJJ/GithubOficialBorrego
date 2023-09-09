const modeloAsesor = require('../modelos/modeloAsesor');
/** Operaciones Basica */
const obtenerAsesores = async () => {
  try {
    return await modeloAsesor.Asesor.findAll({
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerAsesorPorId = async (id) => {
  try {
    return await modeloAsesor.Asesor.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const agregarAsesor = async (asesor) => {
  try {
    return (await modeloAsesor.Asesor.create(asesor, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const eliminarAsesor = async (id) => {
  try {
    await modeloAsesor.Asesor.destroy({ where: { id_asesor: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const actualizarAsesor = async (asesor) => {
  try {
    await modeloAsesor.Asesor.update(asesor, { where: { id_asesor: asesor.id_asesor } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/** Operaciones Requeridas */


module.exports = {
  obtenerAsesores,
  obtenerAsesorPorId,
  agregarAsesor,
  eliminarAsesor,
  actualizarAsesor,
};
