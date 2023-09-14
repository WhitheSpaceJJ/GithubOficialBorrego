const controlPersonas = require('./controles/controlPersonas');

controlPersonas.obtenerPersonaNombre("JOSE JESUS", "OROZCO","HERNANDEZ")
.then((result) => {
    console.log(
        result);
}).catch((error) => {
    console.log(error);
})
