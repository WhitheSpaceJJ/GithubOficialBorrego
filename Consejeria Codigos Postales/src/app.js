const express = require("express");
const estadosRoutes = require('./rutas/estados.routes.js');
const municipiosRoutes = require('./rutas/municipios.routes.js');
const codigosPostalesRoutes = require('./rutas/codigosPostales.routes.js');
const ciudadesRoutes = require('./rutas/ciudades.routes.js');
const coloniasRoutes = require('./rutas/colonias.routes.js');


const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

//Aqui se utilizara el servicio GRPC de usuarios ya que ahi estara el token.
const jwtMiddleware = async (req, res, next) => {

};
app.use('/colonias', jwtMiddleware,coloniasRoutes);
app.use('/codigospostales', jwtMiddleware,codigosPostalesRoutes);

/*
app.use('/estados', jwtMiddleware,estadosRoutes);
app.use('/municipios',jwtMiddleware, municipiosRoutes);
app.use('/ciudades',jwtMiddleware, ciudadesRoutes);
*/

app.use((req, res) => {
  res.status(404).json({ message: "endpoint not found" });
});

module.exports = app;
