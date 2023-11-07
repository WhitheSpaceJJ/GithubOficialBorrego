const modeloAsesor = require('../modelos/modeloAsesor');


/** 
 * @abstract Función que permite obtener todos los asesores
 * @returns  asesores
 * */
const obtenerAsesores = async () => {
  try {
    return await modeloAsesor.Asesor.findAll({
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};


/**
 * @abstract Función que permite obtener un asesor por su id
 * @param {*} id id del asesor
 *  @returns asesor
 * */

const obtenerAsesorPorId = async (id) => {
  try {
    return await modeloAsesor.Asesor.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/** 
 * @abstract Función que permite agregar un asesor
 *  @param {*} asesor  asesor a agregar
 *  @returns asesor si se agrega correctamente, false si no  agrega     
 * */
const agregarAsesor = async (asesor) => {
  try {
    return (await modeloAsesor.Asesor.create(asesor, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite eliminar un asesor
 *  @param {*} id id del asesor a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 * */
const eliminarAsesor = async (id) => {
  try {
    await modeloAsesor.Asesor.destroy({ where: { id_asesor: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite actualizar un asesor
 * @param {*} asesor asesor a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 * */
const actualizarAsesor = async (asesor) => {
  try {
    await modeloAsesor.Asesor.update(asesor, { where: { id_asesor: asesor.id_asesor } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};


  //  Exportar los módulos    
module.exports = {
  obtenerAsesores,
  obtenerAsesorPorId,
  agregarAsesor,
  eliminarAsesor,
  actualizarAsesor,
};
