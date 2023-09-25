const express = require("express");
const estadosRoutes = require('./rutas/estados.routes.js');
const municipiosRoutes = require('./rutas/municipios.routes.js');
const codigosPostalesRoutes = require('./rutas/codigosPostales.routes.js');
const ciudadesRoutes = require('./rutas/ciudades.routes.js');
const coloniasRoutes = require('./rutas/colonias.routes.js');
const CustomeError = require("./utilidades/customeError");
const grpc = require('@grpc/grpc-js');
const {packageDefinition}=require("../cliente/cliente.js")

const errorController = require("./utilidades/errrorController")

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

//Aqui se utilizara el servicio GRPC de usuarios ya que ahi estara el token.
const jwtMiddleware = async (req, res, next) => {
  const tokenHeader = req.headers.authorization; // Obtener el valor del encabezado "Authorization"

  // Verificar si el token existe en el encabezado
  if (!tokenHeader) {
    const customeError = new CustomeError('Token no proporcionado.', 401);
    next(customeError);
    return;
  }

  // Extraer el token del encabezado "Authorization"
  const token = tokenHeader.replace('Bearer ', ''); // Quita "Bearer " del encabezado

  let token_client = grpc.loadPackageDefinition(packageDefinition).tokenService;
  const validador = new token_client.TokenService('localhost:3004', grpc.credentials.createInsecure());
  
  validador.validarToken({ token: token }, function (err, response) {
    if (response.message === "Token inválido") {
      const customeError = new CustomeError('Token inválido, no ha iniciado sesión.', 401);
      next(customeError);
    } else if (response.message === "Token válido") {
      next();
    }
  });
};


app.use('/colonias', jwtMiddleware,coloniasRoutes);
app.use('/codigospostales', jwtMiddleware,codigosPostalesRoutes);

/*
app.use('/estados', jwtMiddleware,estadosRoutes);
app.use('/municipios',jwtMiddleware, municipiosRoutes);
app.use('/ciudades',jwtMiddleware, ciudadesRoutes);
*/


app.all("*", (req, res, next) => {
  const err = new CustomeError("Cannot find " + req.originalUrl + " on the server", 404);
  next(err);
});

app.use(errorController);

module.exports = app;
