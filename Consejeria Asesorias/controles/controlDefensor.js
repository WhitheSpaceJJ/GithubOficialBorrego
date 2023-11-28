const modeloDefensor = require('../modelos/modeloDefensor.js');
const controlEmpleado = require('./controlEmpleados.js');

/**	
 * @abstract Función que permite obtener todos los defensores
 * @returns  defensores
 * */

const obtenerDefensores = async () => {
    try {
        return await modeloDefensor.Defensor.findAll({
            raw: true,
            nest: true,
        });
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
};

/**
 * @abstract Función que permite obtener un defensor por su id
 * @param {*} id id del defensor
 * @returns defensor
 * */
const obtenerDefensorPorId = async (id) => {
    try {
        return await modeloDefensor.Defensor.findByPk(id, {
            raw: true,
            nest: true,
        });
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
};

/**
 * @abstract Función que permite agregar un defensor
 * @param {*} defensor defensor a agregar
 * @returns defensor si se agrega correctamente, false si no  agrega
 * */
const agregarDefensor = async (defensor) => {
    try {
        return (await modeloDefensor.Defensor.create(defensor, { raw: true, nest: true })).dataValues;
    } catch (error) {
        console.log("Error:", error.message);
        return false;
    }
};

/**
 *  @abstract Función que permite eliminar un defensor
 * @param {*} id id del defensor a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 * */

const eliminarDefensor = async (id) => {
    try {
        await modeloDefensor.Defensor.destroy({ where: { id_defensor: id } });
        return true;
    } catch (error) {
        console.log("Error:", error.message);
        return false;
    }
};

/**
 * @abstract Función que permite actualizar un defensor
 * @param {*} id id del defensor a actualizar
 * @param {*} defensor defensor a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 * */
const actualizarDefensor = async (id, defensor) => {
    try {
        await modeloDefensor.Defensor.update(defensor, { where: { id_defensor: id } });
        return true;
    } catch (error) {
        console.log("Error:", error.message);
        return false;
    }
};

const obtenerDefensoresZona = async (id) => {
    try {
        const defensores = await controlEmpleado.obtenerEmpleadosDefensoresPorZona(id);
        if (defensores) {
            const defensoresReturn = [];
             for (let i = 0; i < defensores.length; i++) {
                defensores[i] = defensores[i];
                const defensor = await obtenerDefensorPorId(defensores[i].id_empleado);
                defensoresReturn.push(defensor);
             }
             return defensoresReturn;
        }
        return null;
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
};

// Exportar los módulos
module.exports = {
    obtenerDefensores,
    obtenerDefensorPorId,
    agregarDefensor,
    eliminarDefensor,
    actualizarDefensor,
    obtenerDefensoresZona
};
