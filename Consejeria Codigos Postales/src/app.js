const express = require("express");
const estadosRoutes = require('./rutas/estados.routes.js');
const municipiosRoutes = require('./rutas/municipios.routes.js');
const codigosPostalesRoutes = require('./rutas/codigosPostales.routes.js');
const ciudadesRoutes = require('./rutas/ciudades.routes.js');
const coloniasRoutes = require('./rutas/colonias.routes.js');

const jwtController = require("./utilidades/jwtController.js");

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

app.use('/estados', jwtMiddleware,estadosRoutes);
app.use('/municipios',jwtMiddleware, municipiosRoutes);
app.use('/codigospostales', jwtMiddleware,codigosPostalesRoutes);
app.use('/ciudades',jwtMiddleware, ciudadesRoutes);
app.use('/colonias', jwtMiddleware,coloniasRoutes);


app.use((req, res) => {
  res.status(404).json({ message: "endpoint not found" });
});

module.exports = app;
