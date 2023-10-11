const Escolaridad = require('../models/escolaridad');

class EscolaridadDAO{
    constructor(){}

    async crearEscolaridad({descripcion}){
        try{
            const escolaridad = await Escolaridad.create({descripcion});
            return escolaridad;
        }catch(err){
            throw err;
        }
    }

    async obtenerEscolaridades(){
        try{
            const escolaridades = await Escolaridad.findAll();
            return escolaridades;
        }catch(err){
            throw err;
        }
    }

    async obtenerEscolaridadPorId(id){
        try{
            const escolaridad = await Escolaridad.findByPk(id);
            return escolaridad;
        }catch(err){
            throw err;
        }
    }

    async actualizarEscolaridad(id, {descripcion}){
        try{
            const escolaridad = await Escolaridad.update({descripcion}, {where: {id}});
            return escolaridad;
        }catch(err){
            throw err;
        }
    }

    async eliminarEscolaridad(id){
        try{
            const escolaridad = await Escolaridad.findByPk(id);
            if(!escolaridad){
                throw new Error('No existe la escolaridad');
            }
            await escolaridad.destroy();
            return 'escolaridad eliminada con exito';
        }catch(err){
            throw err;
        }
    }
}

module.exports = new EscolaridadDAO();