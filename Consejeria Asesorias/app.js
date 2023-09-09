
const express = require('express');
const port = 3000;
const zonasRutas = require("./rutas/zonaRutas");
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

const CustomeError = require("./utilidades/customeError");
const errorController = require("./utilidades/errrorController")
const jwtController = require("./utilidades/jwtController");

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


const jwtMiddleware = async (req, res, next) => {
  const { body, originalUrl, method } = req;

    const token = req.headers.authorization;
    const secreto = 'osos-carinosos';

    try {
     // await jwtController.verifyToken(token, secreto);
      next();
    } catch (error) {
      const customeError = new CustomeError('Token inválido, no ha iniciado sesión.', 401);
      next(customeError);
    }
};




app.use('/zonas',jwtMiddleware, zonasRutas);
app.use('/tipos-de-juicio',jwtMiddleware, tipoDeJuiciosRutas);
app.use('/estados-civiles',jwtMiddleware, estadosCivilesRutas);
app.use('/generos',jwtMiddleware, generosRutas);
app.use('/motivos',jwtMiddleware, motivosRutas);
app.use('/asesorias',jwtMiddleware, asesoriasRutas);
app.use('/asesores',jwtMiddleware,asesoresRutas);
app.use('/turnos',jwtMiddleware,turnoRutas);
app.use('/personas',jwtMiddleware,personasRutas);
app.use('/asesorados',jwtMiddleware,asesoradoRutas);
app.use('/catalogo-requisitos',jwtMiddleware,catalogoRequisitosRutas);

app.all("*", (req, res, next) => {
  const err = new CustomeError("Cannot find " + req.originalUrl + " on the server", 404);
  next(err);
});

app.use(errorController);

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto ${port}`);
});