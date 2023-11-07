const modeloEstadoCivil = require('../modelos/modeloEstadoCivil');

/**
 * @abstract Función que permite obtener todos los estados civiles
 * @returns estados civiles
 */
const obtenerEstadosCiviles = async () => {
  try {
    return await modeloEstadoCivil.EstadoCivil.findAll({
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};


/**
 * @abstract Función que permite obtener un estado civil por su id
 * @param {*} id id del estado civil
 * @returns estado civil
 * */
const obtenerEstadoCivilPorId = async (id) => {
  try {
    return await modeloEstadoCivil.EstadoCivil.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/**
 *    @abstract Función que permite agregar un estado civil
 * @param {*} estadoCivil estado civil a agregar
 * @returns estado civil si se agrega correctamente, false si no  agregar
 * */
const agregarEstadoCivil = async (estadoCivil) => {
  try {
    return ( await modeloEstadoCivil.EstadoCivil.create(estadoCivil, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 *  @abstract Función que permite eliminar un estado civil
 *    @param {*} id id del estado civil a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 */
const eliminarEstadoCivil = async (id) => {
  try {
    await modeloEstadoCivil.EstadoCivil.destroy({ where: { id_estado_civil: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite actualizar un estado civil
 * @param {*} estadoCivil estado civil a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 */
const actualizarEstadoCivil = async (estadoCivil) => {
  try {
    await modeloEstadoCivil.EstadoCivil.update(estadoCivil, { where: { id_estado_civil: estadoCivil.id_estado_civil } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

  // Module exports:
module.exports = {
  obtenerEstadosCiviles,
  obtenerEstadoCivilPorId,
  agregarEstadoCivil,
  eliminarEstadoCivil,
  actualizarEstadoCivil

};