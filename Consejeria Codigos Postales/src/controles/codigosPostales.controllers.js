const modelCodigosPostales = require("../modelos/codigosPostales.models");
const getColonias = require("../controles/colonias.controllers");


const getCodigosPostales = async () => {
  try {
    return await modelCodigosPostales.CodigoPostal.findAll({
      raw: true,
      attributes: {
        exclude: ["id_municipio"],
      },
      nest: true,
      include: [modelCodigosPostales.Municipio],
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error en la consulta de codigos postales");
  }
};

const getCodigoPostal = async (id) => {
  try {
    return await modelCodigosPostales.CodigoPostal.findOne({
      raw: true,
      where: {
        id_codigo_postal: id,
      },
      attributes: {
        exclude: ["id_municipio"],
      },
      nest: true,
      include: [modelCodigosPostales.Municipio],
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error en la consulta de codigo postal");
  }
};

const getColoniasByCodigoPostal = async (cp) => {
  try {
    const codigoPostal_pre = await modelCodigosPostales.CodigoPostal.findOne({
      where: {
        codigo_postal: cp,
      },
      raw: false,
      nest: true,
      include: [
        {
          model: modelCodigosPostales.Colonia,
          attributes: {
            exclude: ["id_ciudad", "id_codigo_postal"],
            },
          required: true,
        },
      ],
    });
    const colonias = [];


    for (const colonia of codigoPostal_pre.colonias) {
        
      colonias.push(colonia);
    }
    

    const id_colonia = colonias[0].id_colonia;
    const colonia = await getColonias.getColonia(id_colonia);

    colonias.forEach((colonia) => {
        delete colonia.id_ciudad;
        delete colonia.id_codigo_postal;

    });

    const codigoPstal_str = JSON.stringify(codigoPostal_pre);
    const codigoPostal = JSON.parse(codigoPstal_str);

    delete codigoPostal.colonias;
    delete codigoPostal.id_municipio;

    const municipio_str = JSON.stringify(colonia.municipio);
    const municipio = JSON.parse(municipio_str);
    delete municipio.estado;



    const result = {
      //id_codigo_postal: codigoPostal_pre.id_codigo_postal,
      codigo_postal: codigoPostal,//.codigo_postal,
      colonias:  colonias,
      ciudad: colonia.ciudad,
      municipio: municipio,
      estado: colonia.estado,
    };
    return result;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

module.exports = {
  getCodigosPostales,
  getCodigoPostal,
  getColoniasByCodigoPostal,
};
