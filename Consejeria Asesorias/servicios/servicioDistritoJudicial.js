const controlDistritoJudicial = require('../controles/controlDistritosJudiciales');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");


/**
 * @abstract Servicio que permite agregar un distrito judicial
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * 
 * */
const agregarDistritoJudicial = asyncError(async (req, res, next) => {
    const result = await controlDistritoJudicial.agregarDistritoJudicial(req.body);
    if (result === false) {
        const error = new CustomeError('Error al agregar un distrito judicial', 400);
        return next(error);
    } else {

        res.status(201).json({
            distritoJudicial: result
        });
    }
}
);

/**
 * @abstract Servicio que permite obtener todos los distritos judiciales
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 *  
 * */
const obtenerDistritosJudiciales = asyncError(async (req, res, next) => {
    const result = await controlDistritoJudicial.obtenerDistritosJudiciales();
    if (result === null || result === undefined) {
        const error = new CustomeError('No se encontraron distritos judiciales', 404);
        return next(error);
    } else {
        res.status(200).json({
            distritosJudiciales: result
        });
    }

}
);

/**
 * @abstract Servicio que permite eliminar un distrito judicial
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 *  
 * */

const eliminarDistritoJudicial = asyncError(async (req, res, next) => {
    const result = await controlDistritoJudicial.eliminarDistritoJudicial(req.params.id);
    if (result === false) {
        const error = new CustomeError('Error al eliminar el distrito judicial', 400);
        return next(error);
    } else {

        res.status(200).json({
            mensaje: "Distrito judicial eliminado correctamente"
        });
    }
}
);

/**
 * @abstract Servicio que permite obtener un distrito judicial
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 *  
 * */
const obtenerDistritoJudicial = asyncError(async (req, res, next) => {
    const result = await controlDistritoJudicial.obtenerDistritoJudicial(req.params.id);
    if (result === null || result === undefined) {
        const error = new CustomeError('No se encontro el distrito judicial', 404);
        return next(error);
    } else {
        res.status(200).json({
            distritoJudicial: result
        });
    }

}
);

/**
 * @abstract Servicio que permite actualizar un distrito judicial
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * 
 * */

const actualizarDistritoJudicial = asyncError(async (req, res, next) => {
    const result = await controlDistritoJudicial.actualizarDistritoJudicial(req.params.id, req.body);
    if (result === false) {
        const error = new CustomeError('Error al actualizar el distrito judicial', 400);
        return next(error);
    } else {

        res.status(200).json({
            mensaje: "Distrito judicial actualizado correctamente"
        });
    }
}
);

//Module exports
module.exports = {

    agregarDistritoJudicial,
    obtenerDistritosJudiciales,
    eliminarDistritoJudicial,
    obtenerDistritoJudicial,
    actualizarDistritoJudicial
};
