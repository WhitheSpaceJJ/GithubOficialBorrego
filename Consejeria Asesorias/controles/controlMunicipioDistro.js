const modeloMunicipioDistro = require('../modelos/modeloMunicipioDistro.js');

/**
 * @abstract Función que permite obtener todos los municipios
 * @returns  municipios
 * */
const obtenerMunicipios = async () => {
    try {
        return await modeloMunicipioDistro.MunicipioDistro.findAll({
            raw: true,
            nest: true,
        });
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
};

/**
 * @abstract Función que permite obtener un municipio por su id
 * @param {*} id id del municipio
 * @returns municipio
 * */
const obtenerMunicipioPorId = async (id) => {
    try {
        return await modeloMunicipioDistro.MunicipioDistro.findByPk(id, {
            raw: true,
            nest: true,
        });
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
};

/**
 * @abstract Función que permite agregar un municipio
 * @param {*} municipio municipio a agregar
 *  @returns municipio si se agrega correctamente, false si no  agrega
 * */
const agregarMunicipio = async (municipio) => {
    try {
        return (await modeloMunicipioDistro.MunicipioDistro.create(municipio, { raw: true, nest: true })).dataValues;
    } catch (error) {
        console.log("Error:", error.message);
        return false;
    }
};

/**
 * @abstract Función que permite eliminar un municipio
 * @param {*} id id del municipio a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 * */
const eliminarMunicipio = async (id) => {
    try {
        await modeloMunicipioDistro.MunicipioDistro.destroy({ where: { id_municipio: id } });
        return true;
    } catch (error) {
        console.log("Error:", error.message);
        return false;
    }
};

/**
 * @abstract Función que permite actualizar un municipio
 * @param {*} id id del municipio a actualizar
 * @param {*} municipio municipio a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 * */
const actualizarMunicipio = async (id, municipio) => {
    try {
        await modeloMunicipioDistro.MunicipioDistro.update(municipio, { where: { id_municipio: id } });
        return true;
    } catch (error) {
        console.log("Error:", error.message);
        return false;
    }
};

// Exportar los módulos
module.exports = {
    obtenerMunicipios,
    obtenerMunicipioPorId,
    agregarMunicipio,
    eliminarMunicipio,
    actualizarMunicipio
};