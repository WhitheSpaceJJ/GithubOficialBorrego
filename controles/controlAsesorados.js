const modeloAsesorado = require('../modelos/modeloAsesorado');

const obtenerAsesorados = async () => {
  try {
    return await modeloAsesorado.Asesorado.findAll({
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerAsesoradoPorId = async (id) => {
  try {
    return await modeloAsesorado.Asesorado.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const agregarAsesorado = async (asesorado) => {
  try {
    const result = await modeloAsesorado.Asesorado.create(asesorado, { raw: true, nest: true });
    const asesorado2 = result.dataValues;
    return asesorado2.id_asesorado;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const eliminarAsesorado = async (id) => {
  try {
    await modeloAsesorado.Asesorado.destroy({ where: { id_asesorado: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const actualizarAsesorado = async (asesorado) => {
  try {
    await modeloAsesorado.Asesorado.update(asesorado, { where: { id_asesorado: asesorado.id_asesorado } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

module.exports = {
  obtenerAsesorados,
  obtenerAsesoradoPorId,
  agregarAsesorado,
  eliminarAsesorado,
  actualizarAsesorado,
};
