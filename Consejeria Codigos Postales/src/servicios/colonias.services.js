const controlColonias = require('../controles/colonias.controllers');
const asyncError = require('../utilidades/asyncError.js');
const CustomeError = require('../utilidades/customeError.js');

exports.getColonias = asyncError(async (req, res, next) => {
    const colonias = await controlColonias.getColonias();
    res.status(200).json({
        status: 'success',
        data: colonias
    });
});

exports.getColonia = asyncError(async (req, res, next) => {
    const colonia = await controlColonias.getColonia(req.params.id);
    if (!colonia) {
        return next(new CustomeError(`No se encontró una colonia con el id ${req.params.id}`, 404));
    }
    res.status(200).json({
        status: 'success',
        data: colonia
    });
});





