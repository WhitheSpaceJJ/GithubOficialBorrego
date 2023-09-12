const modeloDetalleAsesoriaCatalogo = require('../modelos/modeloDetalleAsesoria');

/** Operaciones Básicas */

const obtenerDetallesAsesoriaCatalogo = async () => {
  try {
    return await modeloDetalleAsesoriaCatalogo.DetalleAsesoriaCatalogo.findAll({
      raw: true,
      nest: true
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerDetalleAsesoriaCatalogoPorId = async (id) => {
  try {
    return await modeloDetalleAsesoriaCatalogo.DetalleAsesoriaCatalogo.findByPk(id, {
      raw: true,
      nest: true
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const agregarDetalleAsesoriaCatalogo = async (detalle) => {
  try {
    return (await modeloDetalleAsesoriaCatalogo.DetalleAsesoriaCatalogo.create(detalle, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const eliminarDetalleAsesoriaCatalogo = async (id) => {
  try {
    await modeloDetalleAsesoriaCatalogo.DetalleAsesoriaCatalogo.destroy({ where: { id_detalle: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const actualizarDetalleAsesoriaCatalogo = async (detalle) => {
  try {
    await modeloDetalleAsesoriaCatalogo.DetalleAsesoriaCatalogo.update(detalle, { where: { id_detalle: detalle.id_detalle } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/** Operaciones Requeridas */

module.exports = {
  obtenerDetallesAsesoriaCatalogo,
  obtenerDetalleAsesoriaCatalogoPorId,
  agregarDetalleAsesoriaCatalogo,
  eliminarDetalleAsesoriaCatalogo,
  actualizarDetalleAsesoriaCatalogo
};
