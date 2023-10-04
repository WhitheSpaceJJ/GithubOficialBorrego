const {Denuncia} = require('../models');
class DenunciaDAO{
    constructor(){}

    async crearDenuncia({id_proceso_judicial,causa_penal, delito, modalidad,hechos,plazo_cierre, unidad_mpi, estrategia,id_juez}){
        try{
            const denuncia = await Denuncia.create({id_proceso_judicial,causa_penal, delito, modalidad, hechos, plazo_cierre, unidad_mpi,estrategia, id_juez});
            return denuncia;
        }catch(err){
            throw err;
        }
    }

    async obtenerDenuncias(){
        try{
            const denuncias = await Denuncia.findAll();
            return denuncias;
        }catch(err){
            throw err;
        }
    }

    async obtenerDenunciaPorId(id){
        try{
            const denuncia = await Denuncia.findByPk(id);
            return denuncia;
        }catch(err){
            throw err;
        }
    }

    async actualizarDenuncia(id, {id_proceso_judicial,causa_penal, delito, modalidad, hechos, plazo_cierre, unidad_mpi, estrategia, id_juez}){
        try{
            const denuncia = await Denuncia.update({id_proceso_judicial,causa_penal, delito, modalidad, hechos, plazo_cierre, unidad_mpi,estrategia, id_juez}, {where: {id}});
            return denuncia;
        }catch(err){
            throw err;
        }
    }

    async eliminarDenuncia(id){
        try{    
            const denuncia = await Denuncia.findByPk(id);
            if(!denuncia){
                throw new Error('Denuncia no encontrada');    
            }
            await denuncia.destroy();
            return true;
        }catch(e){
            throw e;
        }
    }
}

module.exports = new DenunciaDAO();