const controlUsuarios = require('../controles/controlUsuario'); // Cambio de controlZonas a controlUsuarios
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");
const jwtController = require("../utilidades/jwtController");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

/**
 * @description Servicio que permite agregar un usuario
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @param {Object} next Objeto de siguiente
 * @returns {Object} respuesta con estatus 2002 con el usuario agregado, o error correspondiente
 * */
const agregarUsuario = asyncError(async (req, res, next) => {
  const result = await controlUsuarios.agregarUsuario(req.body); // Cambio de controlZonas a controlUsuarios
  if (result === false) {
    const error = new CustomeError('Error al agregar un usuario', 400);
    return next(error);
  } else {
    res.status(201).json({
      usuario: result // Cambio de zona a usuario
    });
  }
});

/**
 * @description Servicio que permite obtener todos los usuarios
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @param {Object} next Objeto de siguiente
 * @returns {Object} respuesta con estatus 200 con los usuarios, o error correspondiente
 * */
const obtenerUsuarios = asyncError(async (req, res, next) => {
  const result = await controlUsuarios.obtenerUsuarios(); // Cambio de controlZonas a controlUsuarios
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron usuarios', 404); // Cambio de zonas a usuarios
    return next(error);
  } else {
 
    res.status(200).json({
      usuarios: result // Cambio de zonas a usuarios
    });
  }
});

/**
 * @description Servicio que permite eliminar un usuario por su id
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @param {Object} next Objeto de siguiente
 * @returns {Object} respuesta con estatus 200 con el mensaje de eliminación, o error correspondiente
 * */
const eliminarUsuario = asyncError(async (req, res, next) => {
  const result = await controlUsuarios.eliminarUsuario(req.params.id); // Cambio de controlZonas a controlUsuarios
  if (result === false) {
    const error = new CustomeError('Error al eliminar el usuario', 400); // Cambio de zona a usuario
    return next(error);
  } else {

    res.status(200).json({
      message: "El usuario ha sido eliminado" // Cambio de menssage a message
    });
  }
});

/**
 * @description Servicio que permite actualizar un usuario por su id
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @param {Object} next Objeto de siguiente
 * @returns {Object} respuesta con estatus 200 con el usuario actualizado, o error correspondiente
 * */
const actualizarUsuario = asyncError(async (req, res, next) => {
  const result = await controlUsuarios.actualizarUsuario(req.body); // Cambio de controlZonas a controlUsuarios
  if (result === false) {
    const error = new CustomeError('Error al actualizar el usuario', 400); // Cambio de zona a usuario
    return next(error);
  } else {
 
    res.status(200).json({
      usuario: req.body // Cambio de zona a usuario
    });
  }
});

/**
 * @description Servicio que permite obtener un usuario por su id
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @param {Object} next Objeto de siguiente
 * @returns {Object} respuesta con estatus 200 con el usuario encontrado, o error correspondiente
 * */
const obtenerUsuarioPorId = asyncError(async (req, res, next) => {
  const result = await controlUsuarios.obtenerUsuarioPorId(req.params.id); // Cambio de controlZonas a controlUsuarios
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el usuario', 404); // Cambio de zona a usuario
    return next(error);
  } else {

    res.status(200).json({
      usuario: result // Cambio de zona a usuario
    });
  }
});

/**
 * @description Servicio que permite obtener un usuario por su correo y contraseña
 * @param {Object} req Objeto de petición donde se obtienen los datos de correo y contraseña
 * @param {Object} res Objeto de respuesta
 * @param {Object} next Objeto de siguiente
 *  @returns {Object} respuesta con estatus 200 con el usuario encontrado, o error correspondiente
 * */
const obtenerUsuarioCorreoPassword = asyncError(async (req, res, next) => {
  const result = await controlUsuarios.obtenerUsuarioCorreoPassword
    (req.query.correo, req.query.password);
  const usuarioStr = JSON.stringify(result);
  const usuarioObj = JSON.parse(usuarioStr);
  if (usuarioObj === null) {
    const error = new CustomeError('La contraseña es incorrecta.', 404); // Cambio de zona a usuario
    return next(error);
  } else {
    const payload = usuarioObj;
    const token = await jwtController.generateToken(payload);

    res.cookie("_token", token, {
      httpOnly: true,
      //secure:true,  //se usa cuando se tiene un certificado SSL
      //sameSite:true  //se usa cuando se tiene un certificado SSL
    });
    res.status(200).json({
      token: token,
      role: usuarioObj.tipo_user.tipo_usuario,
      name: usuarioObj.nombre + " " + usuarioObj.materno + " " + usuarioObj.paterno
    });

   
  }
});


/**
 *   
 * @description Función que permite generar una contraseña aleatoria
 * @returns {String} Contraseña generada
 */
function generarContraseñaAzar() {
  const longitud = 10;
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let contraseñaGenerada = '';

  for (let i = 0; i < longitud; i++) {
    const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    contraseñaGenerada += caracterAleatorio;
  }

  return contraseñaGenerada;
}

/**
 * @description Función que permite enviar una contraseña por correo
 * @param {String} destinatario Correo del destinatario
 * @param {String} contraseñaGenerada Contraseña generada
 * @returns {Boolean} true si se envió el correo, false si no se envió
 * */
async function enviarContraseñaPorCorreo(destinatario, contraseñaGenerada) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'consejeria.juridica.1966@gmail.com',
      pass: 'gjxj gdmo sgaj cuax',
    },
  });
  const opcionesCorreo = {
    from: 'consejeria.juridica.1966@gmail.com',
    to: destinatario,
    subject: 'Recuperación de contraseña',
    text: `Tu nueva contraseña es: ${contraseñaGenerada}`,
  };
  try {
    await transporter.sendMail(opcionesCorreo);
    return true;
  } catch (error) {
    return false;
  }
}




/**
 * @description Servicio que permite recuperar la contraseña de un usuario
 * @param {Object} req Objeto de petición donde se obtiene el correo del usuario
 * @param {Object} res Objeto de respuesta
 * @param {Object} next Objeto de siguiente
 * @returns {Object} respuesta con estatus 200 con el mensaje de recuperación, o error correspondiente
 * */
const recuperarContraseña = asyncError(async (req, res, next) => {


  const result = await controlUsuarios.obtenerUsuarioCorreo
    (req.query.correo, req.query.password);
  const usuarioStr = JSON.stringify(result);
  const usuarioObj = JSON.parse(usuarioStr);
  if (usuarioObj === null) {
    const error = new CustomeError('No existe un usuario con ese correo.', 404); // Cambio de zona a usuario
    return next(error);
  } else {
    const contraseñaGenerada = generarContraseñaAzar();
    const hashedPassword = await bcrypt.hash(contraseñaGenerada, 10);
    delete usuarioObj.password;
    usuarioObj.password = hashedPassword;
    const result = await controlUsuarios.actualizarUsuario(usuarioObj); // Cambio de controlZonas a controlUsuarios
    if (result === false) {
      const error = new CustomeError('Error en la actualizacion de la contraseña', 400); // Cambio de zona a usuario
      return next(error);
    } else {
      await enviarContraseñaPorCorreo(usuarioObj.correo, contraseñaGenerada);
      res.status(200).json({
        message: 'Se ha enviado una nueva contraseña por correo.',
      });
    }

  }
  


});

// Exportamos las funciones definidas
module.exports = {
  recuperarContraseña,
  agregarUsuario,
  obtenerUsuarios,
  eliminarUsuario,
  actualizarUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarioCorreoPassword
};
