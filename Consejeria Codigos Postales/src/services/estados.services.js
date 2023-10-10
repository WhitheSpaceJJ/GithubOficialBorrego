const controlEstados = require('../controllers/estados.controller.js'); 
const asyncError = require('../utilities/asyncError.js');
const CustomeError = require('../utilities/customeError.js');

exports.getEstados = asyncError(async (req, res, next) => { 
    const estados = await controlEstados.getEstados();
    res.status(200).json({
        status: 'success',
        data: estados,
    });
});

exports.getEstado = asyncError(async (req, res, next) => {
    const estado = await controlEstados.getEstado(req.params.id);
    if (!estado) {
        return next(new CustomeError('No se encontró el estado', 404)); 
    }
    res.status(200).json({ 
        status: 'success', 
        data: estado,
    });
    });
    

