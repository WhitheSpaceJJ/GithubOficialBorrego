const express = require("express");
const estadosRoutes = require('./routes/estados.routes.js');
const municipiosRoutes = require('./routes/municipios.routes.js');
const codigosPostalesRoutes = require('./routes/codigosPostales.routes.js');
const ciudadesRoutes = require('./routes/ciudades.routes.js');
const coloniasRoutes = require('./routes/colonias.routes.js');

const app = express();

app.use(express.json());

app.use('/estados', estadosRoutes);
app.use('/municipios', municipiosRoutes);
app.use('/codigospostales', codigosPostalesRoutes);
app.use('/ciudades', ciudadesRoutes);
app.use('/colonias', coloniasRoutes);


app.use((req, res) => {
  res.status(404).json({ message: "endpoint not found" });
});

module.exports = app;
