const EstadoProcesalDAO = require('../data-access/estado_procesalDAO');

async function transaction() {
    try {
        const EstadoProcesal = await EstadoProcesalDAO.crearEstadoProcesal({descripcion_estado_procesal:'dificil',fecha_estado_procesal: new Date(),id_proceso_judicial:1});
        console.log(EstadoProcesal);
    } catch (err) {
        console.log(err);
    }
}

transaction();