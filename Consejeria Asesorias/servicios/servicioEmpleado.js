const controlEmpleado = require('../controles/controlEmpleados');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**
 * @abstract Servicio  que permite agregar un empleado
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const agregarEmpleado = asyncError(async (req, res, next) => {
    const result = await controlEmpleado.agregarEmpleado(req.body);
    if ( result === false) {
        const error = new CustomeError('Error al agregar un empleado', 400);
        return next(error);
    } else {
    
        res.status(201).json({
            empleado:result
        });
    }
    }
);

/**
 * @abstract Servicio  que permite obtener todos los empleados
 * @param {Object} req Request
 * @param {Object} res Response 
 * @param {Object} next Next
 * */
const obtenerEmpleados = asyncError(async (req, res, next) => {
    const result = await controlEmpleado.obtenerEmpleados();
    if (result === null || result === undefined) {
        const error = new CustomeError('No se encontraron empleados', 404);
        return next(error);
    } else {
        res.status(200).json({
            empleados: result
        });
    }

}
);

/**
 * @abstract Servicio  que permite eliminar un empleado
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const eliminarEmpleado = asyncError(async (req, res, next) => {
    const result = await controlEmpleado.eliminarEmpleado(req.params.id);
    if ( result === false) {
        const error = new CustomeError('Error al eliminar el empleado', 400);
        return next(error);
    } else {
    
        res.status(200).json({
            mensaje:"Empleado eliminado correctamente"
        });
    }
}
);


/**
 * @abstract Servicio  que permite obtener un empleado por su id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */

const obtenerEmpleado = asyncError(async (req, res, next) => {
    const result = await controlEmpleado.obtenerEmpleado(req.params.id);
    if (result === null || result === undefined) {
        const error = new CustomeError('No se encontró el empleado', 404);
        return next(error);
    } else {
        res.status(200).json({
            empleado: result
        });
    }

} 
);

/**
 * @abstract Servicio  que permite actualizar un empleado
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const actualizarEmpleado = asyncError(async (req, res, next) => {
    const result = await controlEmpleado.actualizarEmpleado(req.params.id,req.body);
    if ( result === false) {
        const error = new CustomeError('Error al actualizar el empleado', 400);
        return next(error);
    } else {
    
        res.status(200).json({
            empleado:result
        });
    }
}
);

//Module exports
module.exports = {
    agregarEmpleado,
    obtenerEmpleados,
    eliminarEmpleado,
    obtenerEmpleado,
    actualizarEmpleado
}