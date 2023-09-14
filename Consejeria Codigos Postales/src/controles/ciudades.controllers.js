const modelCiudades = require('../modelos/ciudades.models');

const getCiudades = async () => {
    try {
        const ciudades = await modelCiudades.Ciudad.findAll({
            raw: false,
            nest: true,
            include: [{
                model: modelCiudades.Colonia,
                required: true
            },
        ],
        });

        const result =[];

        for (const ciudad of ciudades) {
            const colonias = [];
            for (const colonia of ciudad.colonias) {
                colonias.push(colonia.nombre_colonia);
            }
            result.push({
                id_ciudad: ciudad.id_ciudad,
                nombre_ciudad: ciudad.nombre_ciudad,
                colonias: colonias

            });
        }
        return result;
    } catch (error) {
        console.log(error);
        throw new Error('Error en la consulta de ciudades');
    }
};

const getCiudad = async (id) => {
    try {
        const ciudad = await modelCiudades.Ciudad.findOne( {
            where: {
                id_ciudad: id,
            },
            raw: false,
            nest: true,
            include: [{
                model: modelCiudades.Colonia,
                required: true
            },
        ],
        });
        const colonias = [];
        for (const colonia of ciudad.colonias) {
            colonias.push(colonia.nombre_colonia);
        }
        const result = {
            ciudad: ciudad.nombre_ciudad,
            colonias: colonias
        };
        return result;
    } catch (error) {
        console.log(error);
        throw new Error('Error en la consulta de ciudades');
    }
};

module.exports = {
    getCiudades,
    getCiudad
};







        
