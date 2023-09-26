const modeloPersona = require('../modelos/modeloPersona');
/** Operaciones Basica */

const obtenerPersonas = async () => {
  try {
    return await modeloPersona.Persona.findAll({
      raw: true,
      nest: true
      ,
      attributes: {
        exclude: ['id_domicilio', 'id_genero']
      },
      include:[modeloPersona.Domicilio,modeloPersona.Genero]
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerPersonaPorId = async (id) => {
  try {
    return await modeloPersona.Persona.findByPk(id, {
      raw: true,
      nest: true
      ,   attributes: {
        exclude: ['id_domicilio', 'id_genero']
      },
      include:[modeloPersona.Domicilio,modeloPersona.Genero]
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const agregarPersona = async (persona) => {
  try {

    return (await modeloPersona.Persona.create(persona, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const eliminarPersona = async (id) => {
  try {
    await modeloPersona.Persona.destroy({ where: { id_persona: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const actualizarPersona = async (persona) => {
  try {
    await modeloPersona.Persona.update(persona, { where: { id_persona: persona.id_persona } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};
/** Operaciones Requeridas */


const obtenerPersonaNombre = async (nombre, apellido_paterno, apellido_materno) => {
  try {
    return await modeloPersona.Persona.findOne({
      where: {
        nombre:  nombre
        ,
        apellido_paterno: 
          apellido_paterno
        
        ,
        apellido_materno: 
          apellido_materno
      }
      ,
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};
const { Op } = require("sequelize");
/*

const obtenerPersonaNombre = async (nombre, apellido_paterno, apellido_materno) => {
  try {
    return await modeloPersona.Persona.findOne({
      where: {
        nombre:nombre,
        apellido_paterno:apellido_paterno,
        apellido_materno:apellido_materno
      },
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

*/
module.exports = {
  obtenerPersonas,
  obtenerPersonaPorId,
  agregarPersona,
  eliminarPersona,
  actualizarPersona,
  obtenerPersonaNombre
};
