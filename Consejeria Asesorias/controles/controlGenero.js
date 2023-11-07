
const modeloGenero = require('../modelos/modeloGenero');


/**
 *  @abstract Función que permite obtener todos los generos
 * @returns generos
 */
const obtenerGeneros = async () => {
  try {
    return await modeloGenero.Genero.findAll({
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};


/**
 *  
 * @abstract Función que permite obtener un genero por su id
 * @param {*} id id del genero
 * @returns genero
 * */
const obtenerGeneroPorId = async (id) => {
  try {
    return await modeloGenero.Genero.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/**
 *  @abstract Función que permite agregar un genero
 * @param {*} genero genero a agregar 
 * @returns genero si se agrega correctamente, false si no  agregar
 * */
const agregarGenero = async (genero) => {
  try {
    return (await modeloGenero.Genero.create(genero, { raw: true, nest: true })).dataValues; 
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite eliminar un genero
 * @param {*} id id del genero a eliminar
 *  @returns true si se elimina correctamente, false si no se elimina
 */

const eliminarGenero = async (id) => {
  try {
    await modeloGenero.Genero.destroy({ where: { id_genero: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};


/**
 * @abstract Función que permite actualizar un genero
 * @param {*} genero genero a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 */
const actualizarGenero = async (genero) => {
  try {
    await modeloGenero.Genero.update(genero, { where: { id_genero: genero.id_genero } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};


/** Operaciones Requeridas */

module.exports = {
  obtenerGeneros,
  obtenerGeneroPorId,
  agregarGenero,
  eliminarGenero,
  actualizarGenero
};