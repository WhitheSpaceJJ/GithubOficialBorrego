
const express = require('express');
const port = 3000;
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

const grpc = require('@grpc/grpc-js');
const {packageDefinition}=require("./cliente/cliente.js")


const CustomeError = require("./utilidades/customeError");
const errorController = require("./utilidades/errrorController")

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

//Aqui se utilizara el servicio GRPC de usuarios ya que ahi estara el token.
const jwtMiddleware = async (req, res, next) => {
  const token = req.body.token;
  let token_client = grpc.loadPackageDefinition(packageDefinition).tokenService;
  const validador = new token_client.TokenService
    ('localhost:3004', grpc.credentials.createInsecure());
    validador.validarToken({token:token
  } 
      , function(err, response) {
        if(response.message==="Token inválido"){
          const customeError = new CustomeError('Token inválido, no ha iniciado sesión.', 401);
          next(customeError);
        }else if(response.message==="Token válido"){
          next();
        }
     });

};
app.use('/asesorias',jwtMiddleware, asesoriasRutas);


/*
app.use('/zonas',jwtMiddleware, zonasRutas);
app.use('/detalle-asesoria',jwtMiddleware, detalleAsesoriaRutas);
app.use('/domicilios',jwtMiddleware, domiciliosRutas);
app.use('/tipos-de-juicio',jwtMiddleware, tipoDeJuiciosRutas);
app.use('/estados-civiles',jwtMiddleware, estadosCivilesRutas);
app.use('/generos',jwtMiddleware, generosRutas);
app.use('/motivos',jwtMiddleware, motivosRutas);
app.use('/asesores',jwtMiddleware,asesoresRutas);
app.use('/turnos',jwtMiddleware,turnoRutas);
app.use('/personas',jwtMiddleware,personasRutas);
app.use('/asesorados',jwtMiddleware,asesoradoRutas);
app.use('/catalogo-requisitos',jwtMiddleware,catalogoRequisitosRutas);
*/
app.all("*", (req, res, next) => {
  const err = new CustomeError("Cannot find " + req.originalUrl + " on the server", 404);
  next(err);
});

app.use(errorController);

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto ${port}`);
});