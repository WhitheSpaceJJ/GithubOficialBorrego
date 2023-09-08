
const modeloMotivo = require('../modelos/modeloMotivo');


const obtenerMotivos = async () => {
  try {
    return await modeloMotivo.Motivo.findAll({
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerMotivoPorId = async (id) => {
  try {
    return await modeloMotivo.Motivo.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const agregarMotivo = async (motivo) => {
  try {
    const result = await modeloMotivo.Motivo.create(motivo, { raw: true, nest: true });
    return result.id_motivo;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const eliminarMotivo = async (id) => {
  try {
    await modeloMotivo.Motivo.destroy({ where: { id_motivo: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const actualizarMotivo = async (motivo) => {
  try {
    await modeloMotivo.Motivo.update(motivo, { where: { id_motivo: motivo.id_motivo } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};



module.exports = {
  obtenerMotivos,
  obtenerMotivoPorId,
  agregarMotivo,
  eliminarMotivo,
  actualizarMotivo
};