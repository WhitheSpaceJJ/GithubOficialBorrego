const express = require("express");
const estadosRoutes = require('./routes/estados.routes.js');
const municipiosRoutes = require('./routes/municipios.routes.js');
const codigosPostalesRoutes = require('./routes/codigosPostales.routes.js');
const ciudadesRoutes = require('./routes/ciudades.routes.js');
const coloniasRoutes = require('./routes/colonias.routes.js');
const CustomeError = require("./utilities/customeError.js");
const grpc = require('@grpc/grpc-js');
const {packageDefinition}=require("../cliente/cliente.js")

const errorController = require("./utilities/errrorController.js")

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
  const validador = new token_client.TokenService('200.58.127.244:161', grpc.credentials.createInsecure());
  
  validador.validarToken({ token: token }, function (err, response) {
    if (response.message === "Token inválido") {
      const customeError = new CustomeError('Token inválido, no ha iniciado sesión.', 401);
      next(customeError);
    } else if (response.message === "Token válido") {
      next();
    }
  });
};


app.use('/colonias',
jwtMiddleware, 
coloniasRoutes);
app.use('/codigospostales',
jwtMiddleware,
 codigosPostalesRoutes);
app.use('/estados',
jwtMiddleware,
estadosRoutes);
app.use('/municipios',
jwtMiddleware,
 municipiosRoutes);
app.use('/ciudades',
jwtMiddleware, 
ciudadesRoutes);



app.all("*", (req, res, next) => {
  const err = new CustomeError("Cannot find " + req.originalUrl + " on the server", 404);
  next(err);
});

app.use(errorController);

module.exports = app;
