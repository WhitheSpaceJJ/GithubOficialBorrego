const procesoJudicialDAO = require('../data-access/proceso_judicialDAO');

const crearProcesoJudicial = async (req, res) => {
    try {
        const { fecha_inicio, fecha_proceso, fecha_conclusion, area_seguimiento, numero_expediente, DTYPE, id_juzgado } = req.body;
        const procesoJudicial = await procesoJudicialDAO.crearProcesoJudicial({
            fecha_inicio,
            fecha_proceso,
            fecha_conclusion,
            area_seguimiento,
            numero_expediente,
            DTYPE,
            id_juzgado,
        });
        res.json(procesoJudicial);
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd',
        });
    }
}

const obtenerProcesosJudiciales = async (req, res) => {
    try {
        const procesosJudiciales = await procesoJudicialDAO.obtenerProcesosJudiciales();
        res.json(procesosJudiciales);
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd',
        });
    }
}

const obtenerProcesoJudicial = async (req, res) => {
    try {
        const { id } = req.params;
        const procesoJudicial = await procesoJudicialDAO.obtenerProcesoJudicialPorId(Number(id));
        res.json(procesoJudicial);
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd',
        });
    }
}

const actualizarProcesoJudicial = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha_inicio, fecha_proceso, fecha_conclusion, area_seguimiento, numero_expediente, DTYPE, id_juzgado } = req.body;
        await procesoJudicialDAO.actualizarProcesoJudicial(Number(id), {
            fecha_inicio,
            fecha_proceso,
            fecha_conclusion,
            area_seguimiento,
            numero_expediente,
            DTYPE,
            id_juzgado,
        });
        const actualizado = await procesoJudicialDAO.obtenerProcesoJudicialPorId(Number(id));
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd',
        });
    }
}

const eliminarProcesoJudicial = async (req, res) => {
    try {
        const { id } = req.params;
        const procesoJudicial = await procesoJudicialDAO.eliminarProcesoJudicial(Number(id));
        res.json(procesoJudicial);
    } catch (error) {
        res.status(500).json({
            message: 'Error al realizar la consulta con bd',
        });
    }
}

module.exports = {
    crearProcesoJudicial,
    obtenerProcesosJudiciales,
    obtenerProcesoJudicial,
    actualizarProcesoJudicial,
    eliminarProcesoJudicial,
};