const modelMunicipios = require('../models/municipios.models');


const getMunicipios = async () => {
    try {
        return await modelMunicipios.Municipio.findAll({
            raw: true,
            attributes:{
                exclude:['id_estado']
            },
            nest: true,
            include: [modelMunicipios.Estado]
            
        });
    } catch (error) {
        console.log(error);
        throw new Error('Error en la consulta de municipios');
    }
};

const getMunicipio = async (id) => {
    try {
        return await modelMunicipios.Municipio.findOne({
            raw: true,
            where: {
                id_municipio: id
            },
            attributes:{
                exclude:['id_estado']
            },
            nest: true,
            include: [modelMunicipios.Estado]
        });
    } catch (error) {
        console.log(error);
        throw new Error('Error en la consulta de municipios');
    }
};


module.exports = {
    getMunicipios,
    getMunicipio,
};
