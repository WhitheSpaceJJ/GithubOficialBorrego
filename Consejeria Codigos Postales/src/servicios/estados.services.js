const controlEstados = require('../controles/estados.controller.js'); 
const asyncError = require('../utilidades/asyncError.js');
const CustomeError = require('../utilidades/customeError.js');

exports.getEstados = asyncError(async (req, res, next) => { 
    const estados = await controlEstados.getEstados();
   /*
    res.status(200).json({
        status: 'success',
        data: estados,
    });
   */
    res.status(200).json({
        estados: estados
    });
});

exports.getEstado = asyncError(async (req, res, next) => {
    const estado = await controlEstados.getEstado(req.params.id);
    if (!estado) {
        return next(new CustomeError('No se encontró el estado', 404)); 
    }
   /*
 res.status(200).json({ 
        status: 'success', 
        data: estado,
    });
   */
    res.status(200).json({ 
        estado: estado
    });


    });
    

