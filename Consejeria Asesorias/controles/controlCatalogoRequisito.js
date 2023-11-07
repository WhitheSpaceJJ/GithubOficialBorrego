const modeloCatalogoRequisito = require('../modelos/modeloCatalogoRequisito');

  
/**
 *  @abstract Función que permite obtener todos los catalogos de requisitos
 * @returns catalogos de requisitos
 */
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

/**
 * @abstract Función que permite obtener un catalogo de requisito por su id
 * @param {*} id id del catalogo de requisito
 * @returns catalogo de requisito
 *  */
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

/**
 * @abstract Función que permite agregar un catalogo de requisito
 * @param {*} catalogoRequisito catalogo de requisito a agregar
 * @returns catalogo de requisito si se agrega correctamente, false si no  agregar
 * */
const agregarCatalogoRequisito = async (catalogoRequisito) => {
  try {
 
    return (await modeloCatalogoRequisito.CatalogoRequisito.create(catalogoRequisito, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 *  @abstract Función que permite eliminar un catalogo de requisito
 * @param {*} id id del catalogo de requisito a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 */
const eliminarCatalogoRequisito = async (id) => {
  try {
    await modeloCatalogoRequisito.CatalogoRequisito.destroy({ where: { id_catalogo: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 *  @abstract Función que permite actualizar un catalogo de requisito
 * @param {*} catalogoRequisito catalogo de requisito a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 */
const actualizarCatalogoRequisito = async (catalogoRequisito) => {
  try {
    await modeloCatalogoRequisito.CatalogoRequisito.update(catalogoRequisito, { where: { id_catalogo: catalogoRequisito.id_catalogo } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

  // Modulos exportados 
module.exports = {
  obtenerCatalogoRequisitos,
  obtenerCatalogoRequisitoPorId,
  agregarCatalogoRequisito,
  eliminarCatalogoRequisito,
  actualizarCatalogoRequisito,
};
