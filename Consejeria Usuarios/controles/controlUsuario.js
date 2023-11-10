const modelUsuario = require("../modelos/modeloUsuario");
const bcrypt = require('bcrypt');

/**
 * @description Función que permite obtener todos los usuarios
 * @returns {Array} Array con todos los usuarios registrados en la base de datos, si no hay usuarios retorna un null
 * */
const obtenerUsuarios = async () => {
  try {
    return await modelUsuario.Usuario.findAll({
      attributes: {
        exclude: ['id_tipouser', 'id_zona'],
      },
      raw: true,
      nest: true,
      include: [
        {model:modelUsuario.TipoUser},
        {model:modelUsuario.Zona}
      ]
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/**
 * @description Función que permite obtener un usuario por su id
 * @param {Number} id Id del usuario a buscar
 * @returns {Object} Objeto con el usuario encontrado, si no hay usuarios retorna un null
 * */
const obtenerUsuarioPorId = async (id) => {
  try {
    return await modelUsuario.Usuario.findByPk(id, {
      attributes: {
        exclude: ['id_tipouser', 'id_zona'],
      },
      raw: true,
      nest: true,
      include: [
        {model:modelUsuario.TipoUser},
        {model:modelUsuario.Zona}
      ]
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/**
 * @description Función que permite obtener un usuario por su correo y contraseña
 * @param {String} correo Correo del usuario a buscar
 * @param {String} password Contraseña del usuario a buscar
 * @returns {Object} Objeto con el usuario encontrado, o null si la constraseña no es válida o no se encuentra el usuario 
 *  */
const obtenerUsuarioCorreoPassword = async (correo, password) => {
  try {
    const usuario = await modelUsuario.Usuario.findOne({
      attributes: {
        exclude: ['id_tipouser', 'id_zona'],
      },
      raw: true,
      nest: true,
      where: {
        correo: correo
      },
      include: [
        { model: modelUsuario.TipoUser },
        { model: modelUsuario.Zona },
      ],
    });

    if (!usuario) {
      return null;
    }
    const esContraseñaValida = await bcrypt.compare(password, usuario.password);
    if (esContraseñaValida) {
      return usuario;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/**
 * @description Función que permite obtener un usuario por su correo
 * @param {String} correo Correo del usuario a buscar
 * @returns {Object} Objeto con el usuario encontrado, o null si no se encuentra el usuario
 * */
const obtenerUsuarioCorreo = async (correo, password) => {
  try {
    const usuario = await modelUsuario.Usuario.findOne({
      attributes: {
        exclude: ['id_tipouser', 'id_zona'],
      },
      raw: true,
      nest: true,
      where: {
        correo: correo
      },
      include: [
        { model: modelUsuario.TipoUser },
        { model: modelUsuario.Zona },
      ],
    });

    if (!usuario) {
      return null;
    }else {
      return usuario;
    }
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};


/**
 * 
 *  @description Función que permite agregar un usuario
 * @param {Object} usuario Objeto con la información del usuario a agregar
 * @returns {Boolean} el usuario si este se agrega correctamente, false si no se agrega
 */
const agregarUsuario = async (usuario) => {
  try {
    const hashedPassword = await bcrypt.hash(usuario.password, 10);
    delete usuario.password;
    usuario.password = hashedPassword;
    //console.log(usuario);
    return (await modelUsuario.Usuario.create(usuario, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 * @description Función que permite eliminar un usuario
 * @param {Number} id Id del usuario a eliminar
 * @returns {Boolean} true si el usuario se elimina correctamente, false si no se elimina
 */
const eliminarUsuario = async (id) => {
  try {
    await modelUsuario.Usuario.destroy({ where: { id_usuario: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 * @description Función que permite actualizar un usuario
 * @param {Object} usuario Objeto con la información del usuario a actualizar
 * @returns {Boolean} true si el usuario se actualiza correctamente, false si no se actualiza
 */

const actualizarUsuario = async (usuario) => {
  try {
    await modelUsuario.Usuario.update(usuario, { where: { id_usuario: usuario.id_usuario } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  agregarUsuario,
  obtenerUsuarioCorreoPassword,
  obtenerUsuarioCorreo,
};
