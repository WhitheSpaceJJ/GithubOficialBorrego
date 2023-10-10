const app = require('./src/app'); // Importamos el modulo app
const { PORT } = require('./src/config/default'); // Importamos el puerto desde config/default.js

app.listen(PORT, () => { // Iniciamos el servidor
    console.log(`Server running on port ${PORT}`); // Mostramos un mensaje en la consola
});
