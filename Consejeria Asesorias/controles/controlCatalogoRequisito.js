const modeloCatalogoRequisito = require('../modelos/modeloCatalogoRequisito');
/** Operaciones Basica */


const obtenerCatalogoRequisitos = async () => {
  try {
    return await modeloCatalogoRequisito.CatalogoRequisito.findAll({
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerCatalogoRequisitoPorId = async (id) => {
  try {
    return await modeloCatalogoRequisito.CatalogoRequisito.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const agregarCatalogoRequisito = async (catalogoRequisito) => {
  try {
    const result = await modeloCatalogoRequisito.CatalogoRequisito.create(catalogoRequisito, { raw: true, nest: true });
    const catalogoRequisito2 = result.dataValues;
    return catalogoRequisito2.id_catalogo;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const eliminarCatalogoRequisito = async (id) => {
  try {
    await modeloCatalogoRequisito.CatalogoRequisito.destroy({ where: { id_catalogo: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const actualizarCatalogoRequisito = async (catalogoRequisito) => {
  try {
    await modeloCatalogoRequisito.CatalogoRequisito.update(catalogoRequisito, { where: { id_catalogo: catalogoRequisito.id_catalogo } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/** Operaciones Requeridas */

module.exports = {
  obtenerCatalogoRequisitos,
  obtenerCatalogoRequisitoPorId,
  agregarCatalogoRequisito,
  eliminarCatalogoRequisito,
  actualizarCatalogoRequisito,
};
