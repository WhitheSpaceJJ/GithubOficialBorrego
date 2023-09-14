const controlMunicipios = require('../controles/municipios.controller'); 
const asyncError = require('../utilidades/asyncError.js');
const CustomeError = require('../utilidades/customeError.js');

exports.getMunicipios = asyncError(async (req, res, next) => {
    const municipios = await controlMunicipios.getMunicipios();
    res.status(200).json({
        status: 'success',
        data: municipios,
    });
});

exports.getMunicipio = asyncError(async (req, res, next) => {
    const municipio = await controlMunicipios.getMunicipio(req.params.id);
    if (!municipio) {
        return next(new CustomeError('No se encontró el municipio', 404));
    }
    res.status(200).json({
        status: 'success',
        data: municipio,
    });
});

