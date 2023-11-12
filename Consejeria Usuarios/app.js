

// Importamos los módulos necesarios
const express = require('express');
const port = 3002;
const usuariosRutas = require("./rutas/usuarioRutas");
const CustomeError = require("./utilidades/customeError");
const errorController = require("./utilidades/errrorController")
const zonasRutas = require("./rutas/zonaRutas");
const tipoRutas = require("./rutas/tipoUsuarioRutas");

const jwtController = require("./utilidades/jwtController");
// Importamos el módulo cors para permitir solicitudes de origen cruzado
const cors = require('cors');

// Creamos una nueva aplicación express
const app = express();

// Usamos el middleware express.json() para analizar las solicitudes con cuerpos JSON
app.use(express.json());

// Usamos el middleware cors para permitir solicitudes de origen cruzado
app.use(cors());

const jwtMiddleware = async (req, res, next) => {
  // Obtenemos el token del encabezado de la solicitud
  const tokenHeader = req.headers.authorization; 
  if (!tokenHeader) {
    // Si no hay token, creamos un error personalizado y lo pasamos al siguiente middleware
    const customeError = new CustomeError('Token no proporcionado.', 401);
    next(customeError);
    return;
  }
  // Eliminamos el prefijo 'Bearer ' del token
  const token = tokenHeader.replace('Bearer ', '');
  
    try {
  await  jwtController.verifyToken(token);
    next();
  } catch (error) {
    const customeError = new CustomeError('Token inválido, no ha iniciado sesión.', 401);
    next(customeError);
  }
};

// Usamos el middleware de rutas de usuarios
app.use('/usuarios', usuariosRutas);
app.use('/zonas', jwtMiddleware, zonasRutas);
app.use('/tipos', jwtMiddleware, tipoRutas);

// Si ninguna ruta coincide, creamos un error personalizado y lo pasamos al siguiente middleware
app.all("*", (req, res, next) => {
  const err = new CustomeError("No se puede encontrar " + req.originalUrl + " en el servidor", 404);
  next(err);
});

// Usamos el controlador de errores como último middleware
app.use(errorController);

// Hacemos que la aplicación escuche en el puerto especificado
app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto ${port}`);
});


/**
 * Variables del servicio de usuarios GRPC para validar el token
 */
const { packageDefinition } = require("./grpc/route.server")
const grpc = require('@grpc/grpc-js');

/**
 * Importamos el controlador de jwt,roteguide y constantes de respuesta
 */
//const jwtController = require("./utilidades/jwtController");
const routeguide = grpc.loadPackageDefinition(packageDefinition).tokenService;
const responseValido = { message: 'Token válido' };
const responseInvalido = { message: 'Token inválido' };

/**
 * Función que permite crear el servidor GRPC el cual valida el token
 *  */
function getServer() {
  var server = new grpc.Server();
  server.addService(routeguide.TokenService.service, {
    validarToken: (call, callback) => {
      jwtController.verifyToken(call.request.token).
        then((response) => {
          callback(null, responseValido);
        }).catch((err) => {
          callback(null, responseInvalido);
        });
    }
  });
  return server;
}

//Inicializamos el servidor GRPC en el puerto 3007
var server = getServer();
server.bindAsync(
  `localhost:${161}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err != null) {
      return console.error(err);
    }
    console.log("")
    console.log(`gRPC listening on ${port}`)
    server.start();
  }
);

