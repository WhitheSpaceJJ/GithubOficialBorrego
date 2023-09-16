const   controlCodigosPostales = require('../controles/codigosPostales.controllers.js');
const asyncError = require('../utilidades/asyncError.js');
const CustomeError = require('../utilidades/customeError.js');

exports.getCodigosPostales = asyncError(async (req, res, next) => {
    const codigosPostales = await controlCodigosPostales.getCodigosPostales();
    if (!codigosPostales) {
        return next(new CustomeError('No se encontraron codigos postales', 404));
    }
  /*
    res.status(200).json({
        success: true,
        data: codigosPostales
    });
    */
    res.status(200).json({
        codigos_postales: codigosPostales
    });
});

exports.getCodigoPostal = asyncError(async (req, res, next) => {
    const codigoPostal = await controlCodigosPostales.getCodigoPostal(req.params.id);
    if (!codigoPostal) {
        return next(new CustomeError('No se encontro el codigo postal', 404));
    }
    /*
    res.status(200).json({
        success: true,
        data: codigoPostal
    });
    */
    res.status(200).json({
        codigo_postal: codigoPostal
    });
});

exports.getColoniasByCodigoPostal = asyncError(async (req, res, next) => {
    const colonias = await controlCodigosPostales.getColoniasByCodigoPostal(req.params.cp);
    if (!colonias) {
        return next(new CustomeError('No se encontraron colonias', 404));
    }
  /*
  res.status(200).json({
        success: true,
        data: colonias
    });
  */
    res.status(200).json({
        colonias: colonias
    });
});
