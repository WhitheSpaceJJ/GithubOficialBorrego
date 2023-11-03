const controlMunicipios = require('../controllers/municipios.controller'); 
const asyncError = require('../utilities/asyncError.js');
const CustomeError = require('../utilities/customeError.js');

exports.getMunicipios = asyncError(async (req, res, next) => {
    const municipios = await controlMunicipios.getMunicipios();
    res.status(200).json({
        municipios: municipios
    });
});

exports.getMunicipio = asyncError(async (req, res, next) => {
    const municipio = await controlMunicipios.getMunicipio(req.params.id);
    if (!municipio) {
        return next(new CustomeError('No se encontró el municipio', 404));
    }
    res.status(200).json({
        municipio: municipio
    });
});

