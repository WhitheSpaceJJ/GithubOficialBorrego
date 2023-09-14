
const express = require('express');
const port = 3002;
const usuariosRutas = require("./rutas/usuarioRutas");

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




app.use('/usuarios',jwtMiddleware, usuariosRutas);

app.all("*", (req, res, next) => {
  const err = new CustomeError("Cannot find " + req.originalUrl + " on the server", 404);
  next(err);
});

app.use(errorController);

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto ${port}`);
});