const controlDefensores = require('../controles/controlDefensor');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**
 * @abstract Servicio  que permite agregar un defensor
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 *  */
const agregarDefensor = asyncError(async (req, res, next) => {
    const result = await controlDefensores.agregarDefensor(req.body);
    if ( result === false) {
        const error = new CustomeError('Error al agregar un defensor', 400);
        return next(error);
    } else {
    
        res.status(201).json({
            defensor:result
        });
    }
    });

/**
 * @abstract Servicio  que permite obtener todos los defensores
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const obtenerDefensores = asyncError(async (req, res, next) => {
    const result = await controlDefensores.obtenerDefensores();
    if (result === null || result === undefined) {
        const error = new CustomeError('No se encontraron defensores', 404);
        return next(error);
    } else {
        res.status(200).json({
            defensores: result
        });
    } 
} );

/**
 * @abstract Servicio  que permite eliminar un defensor
 *  @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const eliminarDefensor = asyncError(async (req, res, next) => {
    const result = await controlDefensores.eliminarDefensor(req.params.id);
    if ( result === false) {
        const error = new CustomeError('Error al eliminar el defensor', 400);
        return next(error);
    } else {
    
        res.status(200).json({
            mensaje:"Defensor eliminado correctamente"
        });
    }
}
);

/**
 * @abstract Servicio  que permite obtener un defensor por su id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const obtenerDefensorPorId = asyncError(async (req, res, next) => {
    const result = await controlDefensores.obtenerDefensorPorId(req.params.id);
    if (result === null || result === undefined) {
        const error = new CustomeError('No se encontró el defensor', 404);
        return next(error);
    } else {
        res.status(200).json({
            defensor: result
        });
    }
}
);

/**
 * @abstract Servicio  que permite actualizar un defensor
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const actualizarDefensor = asyncError(async (req, res, next) => {
    const result = await controlDefensores.actualizarDefensor(req.body);
    if ( result === false) {
        const error = new CustomeError('Error al actualizar el defensor', 400);
        return next(error);
    } else {
    
        res.status(200).json({
            defensor: req.body
        });
    }
}
);

const obtenerDefensoresZona  = asyncError(async (req, res, next) => {
    const result = await controlDefensores.obtenerDefensoresZona(req.params.id);
    if (result === null || result === undefined) {
        const error = new CustomeError('Error al obtener el defensor', 404);
        return next(error);
    } else {
        res.status(200).json({
            defensor: result
        });
    }
}
);

//Module exports
module.exports = {
    agregarDefensor,
    obtenerDefensores,
    eliminarDefensor,
    obtenerDefensorPorId,
    actualizarDefensor,
    obtenerDefensoresZona
};
