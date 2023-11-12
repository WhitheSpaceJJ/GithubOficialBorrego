const modeloDistritoJudicial = require('../modelos/modeloDistritoJudicial.js');

/**
 * @abstract Controlador que permite agregar un distrito judicial
 * @param {Object} distritoJudicial Distrito judicial
 * @returns {Object} Distrito judicial
 */
const agregarDistritoJudicial = async (distritoJudicial) => {
    const distritoJudicialNuevo = await modeloDistritoJudicial.DistritoJudicial.create(distritoJudicial);
    return distritoJudicialNuevo;
};

/**
 * @abstract Controlador que permite obtener todos los distritos judiciales
 * @returns {Object} Distritos judiciales
 */
const obtenerDistritosJudiciales = async () => {
    const distritosJudiciales = await modeloDistritoJudicial.DistritoJudicial.findAll();
    return distritosJudiciales;
};

/**
 * @abstract Controlador que permite eliminar un distrito judicial
 * @param {Number} id Id del distrito judicial
 * @returns {Object} Distrito judicial
 */
const eliminarDistritoJudicial = async (id) => {
    const distritoJudicial = await modeloDistritoJudicial.DistritoJudicial.destroy({
        where: {
            id: id
        }
    });
    return distritoJudicial;
};

/**
 * @abstract Controlador que permite obtener un distrito judicial
 * @param {Number} id Id del distrito judicial
 * @returns {Object} Distrito judicial
 */

const obtenerDistritoJudicial = async (id) => {
    const distritoJudicial = await modeloDistritoJudicial.DistritoJudicial.findOne({
        where: {
            id: id
        }
    });
    return distritoJudicial;
};

/**
 * @abstract Controlador que permite actualizar un distrito judicial
 *  @param {Number} id Id del distrito judicial
 * @param {Object} distritoJudicial Distrito judicial
 * @returns {Object} Distrito judicial
 */
const actualizarDistritoJudicial = async (id, distritoJudicial) => {
    const distritoJudicialActualizado = await modeloDistritoJudicial.DistritoJudicial.update(distritoJudicial, {
        where: {
            id: id
        }
    });
    return distritoJudicialActualizado;
};

//Module exports
module.exports = {

    agregarDistritoJudicial,
    obtenerDistritosJudiciales,
    eliminarDistritoJudicial,
    obtenerDistritoJudicial,
    actualizarDistritoJudicial
};