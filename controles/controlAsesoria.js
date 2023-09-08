const modeloAsesoria = require('../modelos/modeloAsesoria');

const obtenerAsesorias = async () => {
  try {
    return await modeloAsesoria.Asesoria.findAll({
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerAsesoriaPorId = async (id) => {
  try {
    return await modeloAsesoria.Asesoria.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const agregarAsesoria = async (asesoria) => {
  try {
    const result = await modeloAsesoria.Asesoria.create(asesoria, { raw: true, nest: true });
    const asesoria2 = result.dataValues;
    return asesoria2.id_asesoria;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const eliminarAsesoria = async (id) => {
  try {
    await modeloAsesoria.Asesoria.destroy({ where: { id_asesoria: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const actualizarAsesoria = async (asesoria) => {
  try {
    await modeloAsesoria.Asesoria.update(asesoria, { where: { id_asesoria: asesoria.id_asesoria } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

module.exports = {
  obtenerAsesorias,
  obtenerAsesoriaPorId,
  agregarAsesoria,
  eliminarAsesoria,
  actualizarAsesoria,
};
