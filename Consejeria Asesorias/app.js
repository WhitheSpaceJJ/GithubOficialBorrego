// Variable para cargar el módulo de express 
const express = require('express');
// Puerto en el que se ejecutará el servidor
const port = 3009;
// Rutas de la aplicación
const zonasRutas = require("./rutas/zonaRutas");
const domiciliosRutas = require("./rutas/domicilioRutas");
const tipoDeJuiciosRutas = require("./rutas/tipoJuicioRutas");
const generosRutas = require("./rutas/generoRutas");
const estadosCivilesRutas = require("./rutas/estadoCivilRutas");
const motivosRutas = require("./rutas/motivoRutas");
const asesoriasRutas = require("./rutas/asesoriaRutas");
const asesoresRutas = require("./rutas/asesorRutas");
const turnoRutas = require("./rutas/turnoRutas");
const catalogoRequisitosRutas = require("./rutas/catalogoRequisitoRuta");
const personasRutas = require("./rutas/personaRuta");
const asesoradoRutas = require("./rutas/asesorRutas");
const detalleAsesoriaRutas = require("./rutas/detalleAsesoriaRuta");
// Variable para cargar el módulo de gRPC
const grpc = require('@grpc/grpc-js');
// Variable para cargar el módulo de proto-loader
const {packageDefinition}=require("./cliente/cliente.js")
// Variable para cargar el módulo de errores personalizados
const CustomeError = require("./utilidades/customeError");
// Variable para cargar el módulo de control de errores
const errorController = require("./utilidades/errrorController")
// Variable para cargar el módulo de cors
const cors = require('cors');
// Variable para cargar el módulo de express
const app = express();
// Uso de express.json
app.use(express.json());
// Uso de cors
app.use(cors());

// Middleware para validar el token JWT
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
  // Cargamos el servicio de validación de tokens
  let token_client = grpc.loadPackageDefinition(packageDefinition).tokenService;
  const validador = new token_client.TokenService('200.58.127.244:161', grpc.credentials.createInsecure());  
  // Validamos el token
  validador.validarToken({ token: token }, function (err, response) {
    if (response.message === "Token inválido") {
      // Si el token es inválido, creamos un error personalizado y lo pasamos al siguiente middleware
      const customeError = new CustomeError('Token inválido, no ha iniciado sesión.', 401);
      next(customeError);
    } else if (response.message === "Token válido") {
      // Si el token es válido, pasamos al siguiente middleware
      next();
    }
  });
};
// Usamos el middleware de validación de tokens en nuestras rutas
app.use('/asesorias',jwtMiddleware, asesoriasRutas);
app.use('/tipos-de-juicio',jwtMiddleware, tipoDeJuiciosRutas);
app.use('/asesores',jwtMiddleware,asesoresRutas);
app.use('/generos',jwtMiddleware, generosRutas);
app.use('/estados-civiles',jwtMiddleware, estadosCivilesRutas);
app.use('/motivos',jwtMiddleware, motivosRutas);
app.use('/zonas',jwtMiddleware, zonasRutas);
app.use('/detalle-asesoria',jwtMiddleware, detalleAsesoriaRutas);
app.use('/domicilios',jwtMiddleware, domiciliosRutas);
app.use('/turnos',jwtMiddleware,turnoRutas);
app.use('/personas',jwtMiddleware,personasRutas);
app.use('/asesorados',jwtMiddleware,asesoradoRutas);
app.use('/catalogo-requisitos',jwtMiddleware,catalogoRequisitosRutas);
// Middleware para manejar las rutas no encontradas
app.all("*", (req, res, next) => {
  const err = new CustomeError("Cannot find " + req.originalUrl + " on the server", 404);
  next(err);
});
// Middleware para manejar los errores
app.use(errorController);
// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto ${port}`);
});
