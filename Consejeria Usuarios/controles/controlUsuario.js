const { Usuario, TipoUser, Zona } = require("../modelos/modeloUsuario");

/** Operaciones Básicas para Usuario con relaciones */

const obtenerUsuarios = async () => {
  try {
    return await Usuario.findAll({
      include: [TipoUser, Zona], // Incluye las relaciones TipoUser y Zona
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerUsuarioPorId = async (id) => {
  try {
    return await Usuario.findByPk(id, {
      include: [TipoUser, Zona], // Incluye las relaciones TipoUser y Zona
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerUsuarioCorreo = async (correo,password) => {
  try {
    return await Usuario.findOne({
      include: [TipoUser, Zona], // Incluye las relaciones TipoUser y Zona
      raw: true,
      nest: true,
      where:{
        correo:correo,
        password:password
      }
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};
const agregarUsuario = async (usuario) => {
    try {
      return (await Usuario.create(usuario, { raw: true, nest: true })).dataValues;
    } catch (error) {
      console.log("Error:", error.message);
      return false;
    }
  };
  
  const eliminarUsuario = async (id) => {
    try {
      await Usuario.destroy({ where: { id_usuario: id } });
      return true;
    } catch (error) {
      console.log("Error:", error.message);
      return false;
    }
  };
  
  const actualizarUsuario = async (usuario) => {
    try {
      await Usuario.update(usuario, { where: { id_usuario: usuario.id_usuario } });
      return true;
    } catch (error) {
      console.log("Error:", error.message);
      return false;
    }
  };
// Resto de operaciones CRUD básicas...

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  agregarUsuario,
  obtenerUsuarioCorreo
};





