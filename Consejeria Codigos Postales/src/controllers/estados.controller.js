const modelEstados = require("../models/estados.models.js");

const getEstados = async () => { 
  try {
    const estados = await modelEstados.Estado.findAll({
      raw: false,
      nest: true,
      include: [
        {
          model: modelEstados.Municipio,
          required: true,
        },
      ],
    });
    const result = [];

    for (const estado of estados) { 
      const municipios = []; 
      for (const municipio of estado.municipios) { 
        municipios.push(municipio.nombre_municipio);
      }
      result.push({
        id_estado: estado.id_estado,
        nombre_estado: estado.nombre_estado,
        municipios: municipios,
      });
    }
    return result;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

const getEstado = async (id) => {
  try {
    const estado = await modelEstados.Estado.findOne({
      where: {
        id_estado: id,
      },
      raw: false,
      nest: true,
      include: [
        {
          model: modelEstados.Municipio,
          required: true,
        },
      ],
    });
    const municipios = [];
    for (const municipio of estado.municipios) {
      municipios.push(municipio.nombre_municipio);
    }
    const result = {
      id_estado: estado.id_estado,
      nombre_estado: estado.nombre_estado,
      municipios: municipios,
    };
    return result;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

module.exports = {
  getEstados,
  getEstado,
};