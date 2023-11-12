const controlMunicipioDistro = require('../controles/controlMunicipioDistro');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");


/**
 * @abstract Servicio  que permite agregar un municipio
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const agregarMunicipio = asyncError(async (req, res, next) => {
    const result = await controlMunicipioDistro.agregarMunicipio(req.body);
    if ( result === false) {
        const error = new CustomeError('Error al agregar un municipio', 400);
        return next(error);
    } else {
    
        res.status(201).json({
            municipio:result
        });
    }
    }
);

/**
 * @abstract Servicio  que permite obtener todos los municipios
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const obtenerMunicipios = asyncError(async (req, res, next) => {
    const result = await controlMunicipioDistro.obtenerMunicipios();
    if (result === null || result === undefined) {
        const error = new CustomeError('No se encontraron municipios', 404);
        return next(error);
    } else {
        res.status(200).json({
            municipios: result
        });
    }

}
);

/**
 * @abstract Servicio  que permite eliminar un municipio
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const eliminarMunicipio = asyncError(async (req, res, next) => {
    const result = await controlMunicipioDistro.eliminarMunicipio(req.params.id);
    if ( result === false) {
        const error = new CustomeError('Error al eliminar el municipio', 400);
        return next(error);
    } else {
    
        res.status(200).json({
            mensaje:"Municipio eliminado correctamente"
        });
    }
}
);

/**
 *  @abstract Servicio  que permite obtener un municipio por su id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const obtenerMunicipioPorId = asyncError(async (req, res, next) => {
    const result = await controlMunicipioDistro.obtenerMunicipioPorId(req.params.id);
    if (result === null || result === undefined) {
        const error = new CustomeError('No se encontro el municipio', 404);
        return next(error);
    } else {
        res.status(200).json({
            municipio: result
        });
    }
}
);

/**
 * @abstract Servicio  que permite actualizar un municipio
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const actualizarMunicipio = asyncError(async (req, res, next) => {
    const result = await controlMunicipioDistro.actualizarMunicipio(req.params.id, req.body);
    if ( result === false) {
        const error = new CustomeError('Error al actualizar el municipio', 400);
        return next(error);
    } else {
    
        res.status(200).json({
            mensaje:"Municipio actualizado correctamente"
        });
    }
}
);

//Module exports
module.exports = {
    agregarMunicipio,
    obtenerMunicipios,
    eliminarMunicipio,
    obtenerMunicipioPorId,
    actualizarMunicipio
}
