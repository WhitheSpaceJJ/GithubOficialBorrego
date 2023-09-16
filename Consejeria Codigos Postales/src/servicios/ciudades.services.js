const controlCiudades = require('../controles/ciudades.controllers');
const asyncError = require('../utilidades/asyncError.js');
const CustomeError = require('../utilidades/customeError.js');

exports.getCiudades = asyncError(async (req, res, next) => {
    const ciudades = await controlCiudades.getCiudades();
   /*
 res.status(200).json({
        status: 'success',
        data: ciudades
    });
   */
    res.status(200).json({
        ciuades: ciudades
    });
});

exports.getCiudad = asyncError(async (req, res, next) => {
    const ciudad = await controlCiudades.getCiudad(req.params.id);
    if (!ciudad) {
        return next(new CustomeError('No se encontró la ciudad', 404));
    }
  /*
    res.status(200).json({
        status: 'success',
        data: ciudad
    });
  */
    res.status(200).json({
        ciudad: ciudad
    });
});

