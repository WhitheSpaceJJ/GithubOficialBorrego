const modelColonias = require("../models/colonias.models");
const modeloCodigosPostales = require("../models/codigosPostales.models");
const modeloCiudades = require("../models/ciudades.models");
const getMunicipio = require("../controllers/municipios.controller");
//const { get } = require("../routes/colonias.routes");

const getColonias = async () => {
  try {
    return await modelColonias.Colonia.findAll({
      raw: true,
      attributes: {
        exclude: ["id_ciudad", "id_codigo_postal"],
      },
      nest: true,
      include: [modelColonias.Ciudad, modelColonias.CodigoPostal],
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error en la consulta de colonias");
  }
};

const getColonia = async (id) => {
  try {
    const colonia_pre = await modelColonias.Colonia.findOne({
      raw: true,
      where: {
        id_colonia: id,
      },
      attributes: {
        exclude: ["id_ciudad", "id_codigo_postal"],
      },
      nest: true,
      include: [modelColonias.Ciudad, modelColonias.CodigoPostal],
    });
    //console.log(colonia_pre);
    const id_municipio=colonia_pre.codigo_postal.id_municipio;
    //console.log(id_municipio);
    const municipio=await getMunicipio.getMunicipio(id_municipio); 
    //delete colonia_pre.codigo_postal.id_municipio;  
    colonia_pre.municipio=municipio;
    colonia_pre.estado=municipio.estado;

    const colonia_str = JSON.stringify(colonia_pre);
    const result = JSON.parse(colonia_str);


    delete result.municipio.estado;
    delete result.codigo_postal.id_municipio;
    delete result.id_colonia;
    delete result.nombre_colonia;

    const colonia ={id_colonia: colonia_pre.id_colonia, nombre_colonia: colonia_pre.nombre_colonia};
    result.colonia=colonia;




    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error en la consulta de colonias");
  }
};

module.exports = {
  getColonias,
  getColonia,
};

