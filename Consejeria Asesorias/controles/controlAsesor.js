const modeloAsesor = require('../modelos/modeloAsesor');
const controlEmpleado = require('./controlEmpleados.js');

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

const obtenerAsesoresZona = async (id) => {
  try {
    const asesores = await controlEmpleado.obtenerEmpleadosAsesoresPorZona(id);
    if (asesores) {
      const asesoresFiltrados = [];
      for (let i = 0; i < asesores.length; i++) {
        const asesor = await obtenerAsesorPorId(asesores[i].id_empleado);
        asesoresFiltrados.push(asesor);
      }
      return asesoresFiltrados;
    }
    return null;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
}

//  Exportar los módulos    
module.exports = {
  obtenerAsesores,
  obtenerAsesorPorId,
  agregarAsesor,
  eliminarAsesor,
  actualizarAsesor, obtenerAsesoresZona
};
