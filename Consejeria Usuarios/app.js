
const express = require('express');
const port = 3002;
const usuariosRutas = require("./rutas/usuarioRutas");
const CustomeError = require("./utilidades/customeError");
const errorController = require("./utilidades/errrorController")



const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


app.use('/usuarios'
  , usuariosRutas);

app.all("*", (req, res, next) => {
  const err = new CustomeError("Cannot find " + req.originalUrl + " on the server", 404);
  next(err);
});

app.use(errorController);

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto ${port}`);
});



const { packageDefinition } = require("./grpc/route.server")
const grpc = require('@grpc/grpc-js');

const jwtController = require("./utilidades/jwtController");
const routeguide = grpc.loadPackageDefinition(packageDefinition).tokenService;
const responseValido = { message: 'Token válido' };
const responseInvalido = { message: 'Token inválido' };

function getServer() {
  var server = new grpc.Server();
  server.addService(routeguide.TokenService.service, {
    validarToken:(call, callback) => {
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

var server = getServer();
server.bindAsync(
  `198.101.238.125:${3007}`,
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


