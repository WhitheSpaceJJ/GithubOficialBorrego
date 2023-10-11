const modelUsuario = require("../modelos/modeloUsuario")
const bcrypt = require("bcrypt")

/** Operaciones Básicas para Usuario con relaciones */

const obtenerUsuarios = async () => {
  try {
    return await modelUsuario.Usuario.findAll({
      attributes: {
        exclude: ["id_tipouser", "id_zona"],
      },
      raw: true,
      nest: true,
      include: [{ model: modelUsuario.TipoUser }, { model: modelUsuario.Zona }],
    })
  } catch (error) {
    console.log("Error:", error.message)
    return null
  }
}

const obtenerUsuarioPorId = async id => {
  try {
    return await modelUsuario.Usuario.findByPk(id, {
      attributes: {
        exclude: ["id_tipouser", "id_zona"],
      },
      raw: true,
      nest: true,
      include: [{ model: modelUsuario.TipoUser }, { model: modelUsuario.Zona }],
    })
  } catch (error) {
    console.log("Error:", error.message)
    return null
  }
}

const obtenerUsuarioCorreoPassword = async (correo, password) => {
  try {
    const usuario = await modelUsuario.Usuario.findOne({
      attributes: {
        exclude: ["id_tipouser", "id_zona"],
      },
      raw: true,
      nest: true,
      where: {
        correo: correo,
      },
      include: [{ model: modelUsuario.TipoUser }, { model: modelUsuario.Zona }],
    })

    if (!usuario) {
      return null
    }
    //const esContraseñaValida = await bcrypt.compare(password, usuario.password);
    console.log(password, usuario.password)
    const esContraseñaValida = password === usuario.password
    if (esContraseñaValida) {
      return usuario
    } else {
      return null
    }
  } catch (error) {
    console.log("Error:", error.message)
    return null
  }
}

const obtenerUsuarioCorreo = async (correo, password) => {
  try {
    const usuario = await modelUsuario.Usuario.findOne({
      attributes: {
        exclude: ["id_tipouser", "id_zona"],
      },
      raw: true,
      nest: true,
      where: {
        correo: correo,
      },
      include: [{ model: modelUsuario.TipoUser }, { model: modelUsuario.Zona }],
    })

    if (!usuario) {
      return null
    } else {
      return usuario
    }
  } catch (error) {
    console.log("Error:", error.message)
    return null
  }
}

const agregarUsuario = async usuario => {
  try {
    return (
      await modelUsuario.Usuario.create(usuario, { raw: true, nest: true })
    ).dataValues
  } catch (error) {
    console.log("Error:", error.message)
    return false
  }
}

const eliminarUsuario = async id => {
  try {
    await modelUsuario.Usuario.destroy({ where: { id_usuario: id } })
    return true
  } catch (error) {
    console.log("Error:", error.message)
    return false
  }
}

const actualizarUsuario = async usuario => {
  try {
    await modelUsuario.Usuario.update(usuario, {
      where: { id_usuario: usuario.id_usuario },
    })
    return true
  } catch (error) {
    console.log("Error:", error.message)
    return false
  }
}

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  agregarUsuario,
  obtenerUsuarioCorreoPassword,
  obtenerUsuarioCorreo,
}
