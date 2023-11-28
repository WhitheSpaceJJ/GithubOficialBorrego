const modeloEmpleado = require('../modelos/modeloEmpleado.js');


/**
 * @abstract Función que permite obtener todos los empleados
 * @returns  empleados
 * */
const obtenerEmpleados = async () => {
    try {
        return await modeloEmpleado.Empleado.findAll({
            raw: false,
            nest: true,
            attributes: {
                exclude: ["id_distrito_judicial"]
            },
            include: [{
                model: modeloEmpleado.DistritoJudicial
            }

            ]
        });


    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
};

/**
 *  @abstract Función que permite obtener un empleado por su id
 * @param {*} id id del empleado
 * @returns empleado
 * */
const obtenerEmpleadoPorId = async (id) => {
    try {
        return await modeloEmpleado.Empleado.findByPk(id, {
            raw: false,
            nest: true,
            attributes: {
                exclude: ["id_distrito_judicial"]
            },
            include: [{
                model: modeloEmpleado.DistritoJudicial
            }
            ]
        });
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
};

/**
 * @abstract Función que permite agregar un empleado
 * @param {*} empleado empleado a agregar
 * @returns empleado si se agrega correctamente, false si no  agrega
 * */
const agregarEmpleado = async (empleado) => {
    try {
        return (await modeloEmpleado.Empleado.create(empleado, { raw: true, nest: true })).dataValues;
    } catch (error) {
        console.log("Error:", error.message);
        return false;
    }
};

/**
 * @abstract Función que permite eliminar un empleado
 * @param {*} id id del empleado a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 * */
const eliminarEmpleado = async (id) => {
    try {
        await modeloEmpleado.Empleado.destroy({ where: { id_empleado: id } });
        return true;
    } catch (error) {
        console.log("Error:", error.message);
        return false;
    }
};



/**
 * @abstract Función que permite actualizar un empleado
 * @param {*} id id del empleado a actualizar
 * @param {*} empleado empleado a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 * */
const actualizarEmpleado = async (id, empleado) => {
    try {
        await modeloEmpleado.Empleado.update(empleado, { where: { id_empleado: id } });
        return true;
    } catch (error) {
        console.log("Error:", error.message);
        return false;
    }
};

const obtenerEmpleadosAsesoresPorZona = async (id) => {
    try {
        return await modeloEmpleado.Empleado.findAll({
            raw: false,
            nest: true,
            attributes: {
                exclude: ["id_distrito_judicial"]
            },
            include: [{
                model: modeloEmpleado.DistritoJudicial,
                where: { id_zona: id }
            }
            ], where: { tipo_empleado: "asesor" }
        });
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}
const obtenerEmpleadosDefensoresPorZona = async (id) => {
    try {
        return await modeloEmpleado.Empleado.findAll({
            raw: false,
            nest: true,
            attributes: {
                exclude: ["id_distrito_judicial"]
            },
            include: [{
                model: modeloEmpleado.DistritoJudicial,
                where: { id_zona: id }
            }
            ], where: { tipo_empleado: "defensor" }
        });
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}
module.exports = {
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    agregarEmpleado,
    eliminarEmpleado,
    actualizarEmpleado,
    obtenerEmpleadosAsesoresPorZona,obtenerEmpleadosDefensoresPorZona

};