const modeloPersona = require('../modelos/modeloPersona');

const obtenerPersonas = async () => {
  try {
    return await modeloPersona.Persona.findAll({
      raw: true,
      nest: true,
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
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const agregarPersona = async (persona) => {
  try {
    const result = await modeloPersona.Persona.create(persona, { raw: true, nest: true });
    const persona2 = result.dataValues;
    return persona2.id_persona;
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

module.exports = {
  obtenerPersonas,
  obtenerPersonaPorId,
  agregarPersona,
  eliminarPersona,
  actualizarPersona,
};
