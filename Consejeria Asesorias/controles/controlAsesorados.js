const modeloAsesorado = require('../modelos/modeloAsesorado');

 /**
  *   @abstract Función que permite obtener todos los asesorados
  * @returns asesorados
  */    
const obtenerAsesorados = async () => {
  try {
    return await modeloAsesorado.Asesorado.findAll({
      raw: true,
      nest: true,
      
      attributes: {
        exclude: ['id_asesorado', 'id_motivo',"id_estado_civil"]
      },
      include:[modeloAsesorado.Motivo,modeloAsesorado.EstadoCivil]
  
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/**
 * @abstract Función que permite obtener un asesorado por su id
 * @param {*} id id del asesorado
 *  @returns asesorado
 * */
const obtenerAsesoradoPorId = async (id) => {
  try {
    return await modeloAsesorado.Asesorado.findByPk(id, {
      raw: true,
      nest: true
      ,
      attributes: {
        exclude: ['id_asesorado', 'id_motivo',"id_estado_civil"]
      },
      include:[modeloAsesorado.Motivo,modeloAsesorado.EstadoCivil]
  
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

/** 
 * @abstract Función que permite agregar un asesorado
 * @param {*} asesorado asesorado a agregar
 * @returns asesoriado si se agrega correctamente, false si no  agregar
 * */
const agregarAsesorado = async (asesorado) => {
  try {
    return (  await modeloAsesorado.Asesorado.create(asesorado, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

/**
 *  @abstract Función que permite eliminar un asesorado
 * @param {*} id  id del asesorado a eliminar
 * @returns   true si se elimina correctamente, false si no se elimina
 */
const eliminarAsesorado = async (id) => {
  try {
    await modeloAsesorado.Asesorado.destroy({ where: { id_asesorado: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};
 
/**
 *   @abstract Función que permite actualizar un asesorado
 * @param {*} asesorado asesorado a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 */
const actualizarAsesorado = async (asesorado) => {
  try {
    await modeloAsesorado.Asesorado.update(asesorado, { where: { id_asesorado: asesorado.id_asesorado } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

// Exportar los módulos
module.exports = {
  obtenerAsesorados,
  obtenerAsesoradoPorId,
  agregarAsesorado,
  eliminarAsesorado,
  actualizarAsesorado,
};
