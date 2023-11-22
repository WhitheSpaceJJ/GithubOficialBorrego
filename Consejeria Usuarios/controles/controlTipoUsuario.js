const modeloTipoUsuario = require('../modelos/modeloTipoUsuario');

/**
 * @abstract Función que permite obtener todos los tipos de usuario
 * @returns tipos de usuario
 */
const obtenerTiposUsuario = async () => {
  try {
    return await modeloTipoUsuario.TipoUser.findAll({
      raw: true,
      nest: true
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
} ;

/**
 * @abstract Función que permite obtener un tipo de usuario por su id
 * @param {*} id id del tipo de usuario
 * @returns tipo de usuario
 */
const obtenerTipoUsuarioPorId = async (id) => {
  try {
    return await modeloTipoUsuario.TipoUser.findByPk(id, {
      raw: true,
      nest: true
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/**
 * @abstract Función que permite agregar un tipo de usuario
 * @param {*} tipoUsuario tipo de usuario a agregar
 * @returns tipo de usuario si se agrega correctamente, false si no se agrega
 */

const agregarTipoUsuario = async (tipoUsuario) => {
  try {
    return (await modeloTipoUsuario.TipoUser.create(tipoUsuario, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }

};

/**
 * @abstract Función que permite eliminar un tipo de usuario
 * @param {*} id id del tipo de usuario a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 */

const eliminarTipoUsuario = async (id) => {
  try {
    await modeloTipoUsuario.TipoUser.destroy({ where: { id_tipo_usuario: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite actualizar un tipo de usuario
 * @param {*} tipoUsuario tipo de usuario a actualizar
 * @returns tipo de usuario si se actualiza correctamente, false si no se actualiza
 */

const actualizarTipoUsuario = async (tipoUsuario) => {
  try {
    await modeloTipoUsuario.TipoUser.update(tipoUsuario, { where: { id_tipo_usuario: tipoUsuario.id_tipo_usuario } });
    return tipoUsuario;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

//Module exports:
module.exports = {
  obtenerTiposUsuario,
  obtenerTipoUsuarioPorId,
  agregarTipoUsuario,
  eliminarTipoUsuario,
  actualizarTipoUsuario
};